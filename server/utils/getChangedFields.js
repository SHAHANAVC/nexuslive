// utils/getChangedFields.js
import _ from 'lodash';
import mongoose from 'mongoose';

/**
 * Normalize value for comparison:
 * - ObjectId -> string
 * - Date -> ISO date (YYYY-MM-DD)
 * - Date string -> ISO date (YYYY-MM-DD) if parseable
 * - leave others as-is
 */
const normalizeForCompare = (val) => {
  if (val === null || val === undefined) return val;

  // Mongoose ObjectId
  if (mongoose.isValidObjectId(val)) {
    // If it's an object with toString, convert
    try { return val.toString(); } catch (e) { /* fallthrough */ }
  }

  // Date objects
  if (_.isDate(val)) {
    return val.toISOString().split('T')[0]; // normalize to YYYY-MM-DD
  }

  // Strings that look like dates -> normalize
  if (_.isString(val)) {
    const d = new Date(val);
    if (!Number.isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
    return val;
  }

  // For arrays and objects, recursively normalize keys/values
  if (_.isArray(val)) {
    return val.map(normalizeForCompare);
  }

  if (_.isPlainObject(val)) {
    // create sorted keys object to avoid key order differences affecting equality
    const normalized = {};
    const keys = Object.keys(val).sort();
    for (const k of keys) {
      normalized[k] = normalizeForCompare(val[k]);
    }
    return normalized;
  }

  // fallback (number, boolean, etc.)
  return val;
};

/**
 * Custom comparator for isEqualWith to use normalized values.
 * Return true/false to override, or undefined to let isEqual handle.
 */
const customizer = (a, b) => {
  const na = normalizeForCompare(a);
  const nb = normalizeForCompare(b);

  // After normalization, use lodash isEqual on normalized values
  if (_.isEqual(na, nb)) return true;
  return undefined; // let lodash do deeper checks where needed
};

/**
 * getChangedFields(oldObject, updatedObject)
 * - oldObject: full object from DB (e.g. staff.toObject())
 * - updatedObject: partial update payload (from req.body)
 * returns: { field: { from, to }, ... }
 */
export const getChangedFields = (oldObj = {}, updatedObj = {}) => {
  const changes = {};

  // iterate keys in updatedObj (what the client sent)
  for (const key of Object.keys(updatedObj)) {
    // skip undefined in payload
    if (updatedObj[key] === undefined) continue;

    const oldVal = _.get(oldObj, key);
    const newVal = updatedObj[key];

    // Use isEqualWith and customizer so Date vs string date don't trigger false positive
    const equal = _.isEqualWith(oldVal, newVal, customizer);

    if (!equal) {
      changes[key] = { from: oldVal, to: newVal };
    }
  }

  return changes;
};
