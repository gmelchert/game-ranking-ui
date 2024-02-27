export const useDate = (date: string | Date) => {
    const d = new Date(date).toLocaleDateString('pt-BR');
    return d;
}