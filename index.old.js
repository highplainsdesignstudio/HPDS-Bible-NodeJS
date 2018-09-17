var csvParse = require('./bin/csv-parse');


// var writeStream = fs.createWriteStream('./test.txt');
// var thePath = "./bibles.csv";

// csvParse.parseCSV(thePath);

/**
 * Take the test.json file with multiple copies of the bible and convert into
 * json files for each different bible translation.
 */
// var theJson = "./test.json";
// csvParse.parseJSON(theJson);

/**
 * Time to parse through the bibles to further normalize each bible.
 * This section will take the array of verses that each bible object consists of
 * and turn them into an array of books that consist of verses. for example.
 * Bible [
 * Genesis: [
 *    1: [
 *      1:"etc."],
 *      2:"etc."]
 * ]
 */
csvParse.processBibles("./AmericanKingJamesVersion.json", "AKJV");
csvParse.processBibles("./AmericanStandardVersion.json", "AsV");
csvParse.processBibles("./DarbyBibleTranslation.json", "DBT");
csvParse.processBibles("./DouayRheimsBible.json", "DRB");
csvParse.processBibles("./EnglishRevisedVersion.json", "ERV");
csvParse.processBibles("./KingJamesBible.json", "KJV");
csvParse.processBibles("./WebsterBibleTranslation.json", "WBT");
csvParse.processBibles("./WorldEnglishBible.json", "WEB");
csvParse.processBibles("./YoungsLiteralTranslation.json", "YLT");