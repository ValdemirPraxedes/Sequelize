module.exports = (cpf) => {
    if (!cpf) return false;

    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Elimina CPFs inválidos conhecidos (ex: "00000000000")
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Calcula os dígitos verificadores
    const calcularDigito = (base) => {
        let soma = 0;
        for (let i = 0; i < base.length; i++) {
            soma += parseInt(base[i]) * (base.length + 1 - i);
        }
        let resto = (soma * 10) % 11;
        return resto === 10 ? 0 : resto;
    };

    // Primeiro dígito verificador
    const primeiroDigito = calcularDigito(cpf.slice(0, 9));
    if (primeiroDigito !== parseInt(cpf[9])) return false;

    // Segundo dígito verificador
    const segundoDigito = calcularDigito(cpf.slice(0, 10));
    if (segundoDigito !== parseInt(cpf[10])) return false;

    return true; // CPF válido
};