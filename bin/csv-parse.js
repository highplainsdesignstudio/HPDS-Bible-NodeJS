var fs = require('fs');

// Global varibles.
// var writeStream = fs.createWriteStream('./test.json');

var csvParse = {
    /**
     * parseCSV(path) handles the bulk of the module. It accepts a string file path,
     * reads the stream and converts every chunk into a string and pushes it to theText[].
     * When the stream ends, toJSON(array) begins to turn loose strings into formatted objects.
     * 
     */
    parseCSV: function(path) {
        csvParse.readStream = fs.createReadStream(path);

        csvParse.readStream.on('readable', function() {
            let chunk = csvParse.readStream.read();
            if (chunk != null) {
                csvParse.theText += chunk.toString();
            }
        });

        csvParse.readStream.on('end', function() {
            csvParse.toJSON(csvParse.theText);
         });
    },

    readStream: null,
    theText: "",
    toJSON: function(text) {
        /** First, split the text into lines. */
        var lines = text.split("\n");
        // console.log(lines.length);
        /** Then, the lines can be cut into cells using a delimiter.
         * This delimiter should be extracted out and placed into the list of parameters.
         */
        var bible = [];
        var headers = lines[0].split('@');
        for (let i = 1; i < lines.length-1; i++) {
            var line = lines[i].split('@');
            var verse = {};
            for (let j = 0; j < headers.length; j++) {
                if (line[j] != null) {
                    verse[headers[j]] = line[j];
                }
                
            }
            bible.push(verse);
        }

        /**
         * After the bible object is created, it needs to be turned into a JSON file.
         */
        writeStream.write(JSON.stringify(bible));
        writeStream.end();
    },

    parseJSON: function(path) {
        var jsonParse = fs.createReadStream(path);
        var jsonString = "";
        var KJV = [], ASV= [], DRB= [], DBT= [], ERV= [], WBT= [], WEB= [], YLT= [], AKJV = [];

        jsonParse.on('readable', function() {
            var chunk = jsonParse.read();
            if (chunk != null) {
                jsonString += chunk.toString();
            }
        });

        jsonParse.on('end', function() {
            var bible = JSON.parse(jsonString);
            for (var i = 0; i < bible.length; i++) {
                for (var key in bible[i]) {
                    if (key != "verse") {
                        switch(key) {
                            case "King James Bible":
                                KJV.push({"verse": bible[i].Verse, "text": bible[i]["King James Bible"]});
                                break;
                            case "American Standard Version":
                                ASV.push({"verse": bible[i].Verse, "text": bible[i]["American Standard Version"]});
                                break;
                            case "Douay-Rheims Bible":
                                DRB.push({"verse": bible[i].Verse, "text": bible[i]["Douay-Rheims Bible"]});
                                break;
                            case "Darby Bible Translation":
                                DBT.push({"verse": bible[i].Verse, "text": bible[i]["Darby Bible Translation"]});
                                break;
                            case "English Revised Version":
                                ERV.push({"verse": bible[i].Verse, "text": bible[i]["English Revised Version"]});
                                break;
                            case "Webster Bible Translation":
                                WBT.push({"verse": bible[i].Verse, "text": bible[i]["Webster Bible Translation"]});
                                break;
                            case "World English Bible":
                                WEB.push({"verse": bible[i].Verse, "text": bible[i]["World English Bible"]});
                                break;
                            case "Young's Literal Translation":
                                YLT.push({"verse": bible[i].Verse, "text": bible[i]["Young's Literal Translation"]});
                                break;
                            case "American King James Version":
                                AKJV.push({"verse": bible[i].Verse, "text": bible[i]["American King James Version"]});
                                break;
                        }
                    }
                }
            }

            var KVJwrite = fs.createWriteStream('./KingJamesBible.json');
            KVJwrite.write(JSON.stringify(KJV));
            var ASVwrite = fs.createWriteStream('./AmericanStandardVersion.json');
            ASVwrite.write(JSON.stringify(ASV));
            var DRBwrite = fs.createWriteStream('./DouayRheimsBible.json');
            DRBwrite.write(JSON.stringify(DRB));
            var DBTwrite = fs.createWriteStream('./DarbyBibleTranslation.json');
            DBTwrite.write(JSON.stringify(DBT));
            var ERVwrite = fs.createWriteStream('./EnglishRevisedVersion.json');
            ERVwrite.write(JSON.stringify(ERV));
            var WBTwrite = fs.createWriteStream('./WebsterBibleTranslation.json');
            WBTwrite.write(JSON.stringify(WBT));
            var WEBwrite = fs.createWriteStream('./WorldEnglishBible.json');
            WEBwrite.write(JSON.stringify(WEB));
            var YLTwrite = fs.createWriteStream('./YoungsLiteralTranslation.json');
            YLTwrite.write(JSON.stringify(YLT));
            var AKVJwrite = fs.createWriteStream('./AmericanKingJamesVersion.json');
            AKVJwrite.write(JSON.stringify(AKJV));

        });
    },

    processBibles: function(path, newName) {
        var readStream = fs.createReadStream(path);
        var text = "";

        readStream.on('readable', function() {
            var chunk = readStream.read();
            if (chunk != null) {
                text += chunk.toString();
            }
        });

        readStream.on('end', function() {
            var bible = JSON.parse(text);
            var newBible = {};
            var index = /\d*:\d*/;
            var chapVerseRe = /:/;
            for (var i = 0; i < bible.length; i++) {
                var key = bible[i].verse;
                var chapterVerseIndex = key.search(index);
                var book = (key.slice(0, chapterVerseIndex)).trim();
                var chapterVerse = (key.slice(chapterVerseIndex)).trim();
                var verseIndex = chapterVerse.search(chapVerseRe);
                var chapter = (chapterVerse.slice(0, verseIndex)).trim();
                var verse = (chapterVerse.slice(verseIndex + 1)).trim();

                if (!newBible.hasOwnProperty(book)) {
                    newBible[book] = {};
                }
                if (!newBible[book].hasOwnProperty(chapter)) {
                    newBible[book][chapter] = {};
                }
                newBible[book][chapter][verse] = bible[i].text;
                // newBible.book.chapter.verse = bible[i].text;
            }

            var writeStream = fs.createWriteStream(newName + '.json');
            writeStream.on('error', function(err) {
                console.log(err);
            });
            writeStream.write(JSON.stringify(newBible));
            writeStream.end();
        });
    }
};

module.exports = csvParse;