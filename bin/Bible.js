var fs = require('fs');

var Bible = {
    getBible: function(req, res, next) {
        var version = req.params.version;
        var book = req.params.book;
        var chapter = req.params.chapter;
        var path = __dirname + "/bibles/" + version + ".json";
        /**
         * Need to access the bible json file and return the whole
         * chapter that is selected. It will be asynchronous, so
         * keep that in mind.
         */
        var bibleReadStream = fs.createReadStream(path);
        var bible = '';

        bibleReadStream.on('readable', function() {
            var chunk = bibleReadStream.read();
            if(chunk != null) {
                bible += chunk.toString();
            }
        });

        bibleReadStream.on('end', function() {
            var bibleJSON = JSON.parse(bible);
            res.locals.bibleJSON = bibleJSON[book][chapter];
            res.locals.chapterCount = Object.keys(bibleJSON[book]);
            next();
        });

        bibleReadStream.on('error', function(err) {
            console.log(err);
        });
    },

    getBooks: function(req, res ,next) {
        var books = {
            "Old Testament": [
                "Genesis",
                "Exodus",
                "Leviticus",
                "Numbers",
                "Deuteronomy",
                "Joshua",
                "Judges",
                "Ruth",
                "1 Samuel",
                "2 Samuel",
                "1 Kings",
                "2 Kings",
                "1 Chronicles",
                "2 Chronicles",
                "Ezra",
                "Nehemiah",
                "Esther",
                "Job",
                "Psalm",
                "Proverbs",
                "Ecclesiastes",
                "Song of Solomon",
                "Isaiah",
                "Jeremiah",
                "Lamentations",
                "Ezekiel",
                "Daniel",
                "Hosea",
                "Joel",
                "Amos",
                "Obadiah",
                "Jonah",
                "Micah",
                "Nahum",
                "Habakkuk",
                "Zephaniah",
                "Haggai",
                "Zechariah",
                "Malachi"
            ],
            "New Testament": [
                "Matthew",
                "Mark",
                "Luke",
                "John",
                "Acts",
                "Romans",
                "1 Corinthians",
                "2 Corinthians",
                "Galatians",
                "Ephesians",
                "Philippians",
                "Colossians",
                "1 Thessalonians",
                "2 Thessalonians",
                "1 Timothy",
                "2 Timothy",
                "Titus",
                "Philemon",
                "Hebrews",
                "James",
                "1 Peter",
                "2 Peter",
                "1 John",
                "2 John",
                "3 John",
                "Jude",
                "Revelation"
            ]
        };
        
        res.locals.books = books;
        next();
    },

    getChapterCount: function(req, res, next) {
        var chapterCount = {
            "Genesis": 50,
            "Exodus": 40,
            "Leviticus": 27,
            "Numbers": 36,
            "Deuteronomy": 34,
            "Joshua": 24,
            "Judges": 21,
            "Ruth": 4,
            "1 Samuel": 31,
            "2 Samuel": 24,
            "1 Kings": 22,
            "2 Kings": 25,
            "1 Chronicles": 29,
            "2 Chronicles": 36,
            "Ezra": 10,
            "Nehemiah": 13,
            "Esther": 10,
            "Job": 42,
            "Psalm": 150,
            "Proverbs": 31,
            "Ecclesiastes": 12,
            "Song of Solomon": 8,
            "Isaiah": 66,
            "Jeremiah": 52,
            "Lamentations": 5,
            "Ezekiel": 48,
            "Daniel": 12,
            "Hosea": 14,
            "Joel": 3,
            "Amos": 9,
            "Obadiah": 1,
            "Jonah": 4,
            "Micah": 7,
            "Nahum": 3,
            "Habakkuk": 3,
            "Zephaniah": 3,
            "Haggai": 2,
            "Zechariah": 14,
            "Malachi": 4,
            "Matthew": 28,
            "Mark": 16,
            "Luke": 24,
            "John": 21,
            "Acts": 28,
            "Romans": 16,
            "1 Corinthians": 16,
            "2 Corinthians": 13,
            "Galatians": 6,
            "Ephesians": 6,
            "Philippians": 4,
            "Colossians": 4,
            "1 Thessalonians": 5,
            "2 Thessalonians": 3,
            "1 Timothy": 6,
            "2 Timothy": 4,
            "Titus": 3,
            "Philemon": 1,
            "Hebrews": 13,
            "James": 5,
            "1 Peter": 5,
            "2 Peter": 3,
            "1 John": 5,
            "2 John": 1,
            "3 John": 1,
            "Jude": 1,
            "Revelation": 22
        };

        res.locals.chapterCount = chapterCount;
        next();
    },

    getVersions: function(req, res, next) {
        var versions = [
            "American King James Version",
            "American Standard Version",
            "Darby Bible Translation",
            "Douay-Rheims Bible",
            "English Revised Version",
            "King James Bible",
            "Webster Bible Translation",
            "World English Bible",
            "Young's Literal Translation"
        ];

        res.locals.versions = versions;
        next();
    }
};

module.exports = Bible;