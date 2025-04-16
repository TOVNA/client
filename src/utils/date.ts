export const calculateAgeDecimal = (birthDate: Date) => {
    const today = new Date();
  
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
  
    if (days < 0) {
      months--;
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    return `${years}.${months.toString().padStart(2, "0")}`;
  }