class APIFeatures {
  constructor(query, reqQuery) {
    this.query = query;
    this.reqQuery = reqQuery;
  }

  filter() {
    //1A) Filtering
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryobj = { ...this.reqQuery };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryobj[el]);
    //2B) Advanced filtering
    let queryStr = JSON.stringify(queryobj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.reqQuery.sort) {
      const sortBy = this.reqQuery.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitingFields() {
    if (this.reqQuery.fields) {
      const fields = this.reqQuery.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.reqQuery.page * 1 || 1;
    const limit = this.reqQuery.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
