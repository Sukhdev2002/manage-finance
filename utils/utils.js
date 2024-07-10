const buildQuery = (userId, queryParams) => {
    const { month, moduleCode, category, subcategory } = queryParams;
    const query = { userId };
     // YYYY-MM format
    let startOfMonth, endOfMonth;
    if (month) {
        const isMonthOnly = month?.length === 7;
        if (isMonthOnly) {
            startOfMonth = new Date(`${month}-01`);
            endOfMonth = new Date(new Date(`${month}-01`).setMonth(startOfMonth.getMonth() + 1) - 1);
        } else {
            startOfMonth = new Date(month);
            endOfMonth = new Date(month);
            endOfMonth.setHours(23, 59, 59, 999);
        }
        query.date = { $gte: startOfMonth, $lte: endOfMonth };
    } 

   

    if (moduleCode) {
        query.moduleCode = moduleCode;
    }
    if (category) {
        query.category = category;
    }
    if (subcategory) {
        query.subcategory = subcategory;
    }

    return query;
};

module.exports = {buildQuery}