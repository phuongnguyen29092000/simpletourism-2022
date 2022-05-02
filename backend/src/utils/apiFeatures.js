const { Tour } = require("../models");
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "typePlace"];
    excludedFields.forEach((element) => delete queryObj[element]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query
      .find(JSON.parse(queryStr))
      .populate({ path: "typePlace" });
    return this;
  }

  typePlace(typePlaceQuery, tours) {
    const res = [];
    tours.forEach((item) => {
      if (item.typePlace.slug === typePlaceQuery) {
        res.push(item);
      }
    });
    return res;
  }

  discount() {
    if (this.queryString.discount) {
      this.query = this.query
        .find({ discount: { $ne: null } })
        .populate({ path: "typePlace" });
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy).populate({ path: "typePlace" });
    }
    return this;
  }

  fieldLimit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields).populate({ path: "typePlace" });
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query
      .skip(skip)
      .limit(limit)
      .populate({ path: "typePlace" });
    return this;
  }
}

module.exports = APIFeatures;
