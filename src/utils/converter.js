export const formatDict = (value, type) => {
    if (type === 'cpf') {
        const str = value.split('');
        const str1 = str[0] + str[1] + str[2];
        const str2 = str[3] + str[4] + str[5];
        const str3 = str[6] + str[7] + str[8];
        const str4 = str[9] + str[10];

        return `${str1}.${str2}.${str3}-${str4}`
    }

    if (type === 'cnpj') {
        const str = value.split('');
        const str1 = str[0] + str[1];
        const str2 = str[2] + str[3] + str[4];
        const str3 = str[5] + str[6] + str[7];
        const str4 = str[8] + str[9] + str[10] + str[11];
        const str5 = str[12] + str[13];

        return `${str1}.${str2}.${str3}/${str4}-${str5}`
    }

    return value;
}

export const getDate = () => {
    return new Date()
}