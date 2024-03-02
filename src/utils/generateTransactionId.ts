export const generateTransactionId = () => {
    // Prefix
    var prefix = 'dkidmdf';

    // Create a timestamp string
    var timestamp = new Date().getTime().toString();

    // Generate a random 4-digit number
    var random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    // Concatenate prefix, timestamp, and random number with hyphens
    var transactionId = prefix + '-' + timestamp + '-' + random;

    return transactionId;
}


