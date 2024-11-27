function filterUndefined(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value !== undefined)
    );
}

export default filterUndefined;