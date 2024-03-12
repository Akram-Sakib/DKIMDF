export const generateTransactionId = () => {
    // Prefix
    const prefix = 'dkidmdf';

    // Create a timestamp string
    const timestamp = new Date().getTime().toString();

    // Generate a random 4-digit number
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    // Concatenate prefix, timestamp, and random number with hyphens
    const transactionId = prefix + '-' + timestamp + '-' + random;

    return transactionId;
}


