const ruPages = {
    login: {
        text: "У вас нет доступа к сайту. Попросите бота вас пустить",
        toBot: "К боту",
    },
    profile: {
        title: "Мой профиль",
        userForm: "Общая информация",
        success: {
            updateUser: "Данные обновлены",
        },
        errors: {
            updateUser: "Не удалось обновить данные!",
        },
    },
    registration: {
        text: "Вы не зарегистрированы в системе. Введите:",
        fields: {
            lastName: "Фамилия",
            firstName: "Имя",
            passport: "Номер паспорта",
        },
        success: {
            registration: "Вы успешно зарегистрированы",
        },
        errors: {
            registration: "Не удалось пройти регистрацию!",
        },
    },
    home: {
        title: "Главное",
    },
};
export default ruPages;
