
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.keyword) {
            const keyword = this.queryStr.keyword.trim();

            this.query = this.query.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { designation: { $regex: keyword, $options: 'i' } }
                ]
            });

            console.log("Search keyword: ", keyword);
        }

        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(field => delete queryCopy[field]);

        if (queryCopy.Department) {
            queryCopy.Department = {
                $in: queryCopy.Department.split(',').map(dep => dep.trim())
            };
        }
        console.log("Filter object before applying:", queryCopy);

        this.query = this.query.find(queryCopy);

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

export default ApiFeatures
