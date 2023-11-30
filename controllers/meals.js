const getAllMeals = async (req, res) => {
    res.send('register user')
};

const getMeal = async (req, res) => {
    res.send('login user')
};

const createMeal = async (req, res) => {
    res.json(req.user)
};

const updateMeal = async (req, res) => {
    res.send('update meal')
};

const deleteMeal = async (req, res) => {
    res.send('delete meal')
};


module.exports = {
    getAllMeals,
    getMeal,
    createMeal,
    updateMeal,
    deleteMeal
};