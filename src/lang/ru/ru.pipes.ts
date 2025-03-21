const ruPipes = {
    claimStatus: {
        created: "Создана",
        completed: "Выполнена",
        inProgress: "В работе",
        failed: "Отклонена",
    },
    medicineDiseaseType: {
        disease: "Заболевание",
        addiction: "Зависимость",
        mentalDisorder: "Псих. расстройство",
    },
    medicineParamsType: {
        digital: "Число",
        boolean: "Да/нет",
        ball: "Баллы",
    },
    messageStatus: {
        claims: "Заявка",
        fines: "Штраф",
        medicalPolicies: "Мед. полис",
        messages: "Сообщение",
        taxes: "Платеж",
        wanteds: "Розыск Юг",
        wanteds2: "Розыск Север",
    },
    filterTextEquals: {
        contains: "Содержит",
        notContains: "Не содержит",
        equals: "Равен",
        startWith: "Начинается с",
        endWith: "Заканчивается на",
        isClear: "Нет значения",
        isNotClear: "Есть значение",
    },
    filterNumberEquals: {
        contains: "Содержит",
        notContains: "Не содержит",
        equals: "Равно",
        more: ">=",
        less: "<=",
        notEquals: "Не равно",
    },
    filterDateEquals: {
        equals: "Равно",
        more: ">=",
        less: "<=",
        notEquals: "Не равно",
    },
    medicalPoliciesType: {
        oms: "ОМС",
        base: "Базовый",
        advanced: "Продвинутый",
        platinum: "Платиновый",
        corporate: "Корпоративный",
    },
    rolePermissions: {
        admins: "Администрирование",
        claims: "Заявки",
        qr: "QR-сканер",
        users: "Видеть пользователей",
        medicalInfo: "Мед. информация",
        medicalPolicies: "Мед. полис",
        taxes: "Платежи",
        fines: "Штрафы Север",
        wanteds: "Розыск Юг",
        wanteds2: "Розыск Север",
        shop: "Магазин",
        medicineAdmin: "Болезни",
    },
    rolePermissionAction: {
        view: "Просмотр",
        add: "Создавать",
        edit: "Редактировать",
        delete: "Удалять",
    },
    userRolePermissionAction: {
        barsogoria: "Барсогория",
        lacedonia: "Лакедония",
    },
    taxeStatus: {
        active: "Не оплачен",
        completed: "Оплачен",
        expired: "Просрочен",
    },
    wantedType: {
        minima: "Минима",
        minoris: "Минорис",
        majoris: "Майорис",
        ekstremis: "Экстремис",
    },
};
export default ruPipes;
