const defaultPopularVideos = [
    {
        "popularity": 27.832,
        "vote_count": 14231,
        "video": false,
        "poster_path": "/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
        "id": 278,
        "adult": false,
        "backdrop_path": "/j9XKiZrVeViAixVRzCta7h1VU9W.jpg",
        "original_language": "en",
        "original_title": "The Shawshank Redemption",
        "genre_ids": [
            80,
            18
        ],
        "title": "The Shawshank Redemption",
        "vote_average": 8.7,
        "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
        "release_date": "1994-09-23",
        "imdbID": "tt0111161"
    },
    {
        "popularity": 31.062,
        "vote_count": 10889,
        "video": false,
        "poster_path": "/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg",
        "id": 238,
        "adult": false,
        "backdrop_path": "/6xKCYgH16UuwEGAyroLU6p8HLIn.jpg",
        "original_language": "en",
        "original_title": "The Godfather",
        "genre_ids": [
            80,
            18
        ],
        "title": "The Godfather",
        "vote_average": 8.6,
        "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
        "release_date": "1972-03-14",
        "imdbID": "tt0068646"
    },
    {
        "popularity": 23.237,
        "vote_count": 8709,
        "video": false,
        "poster_path": "/yPisjyLweCl1tbgwgtzBCNCBle.jpg",
        "id": 424,
        "adult": false,
        "backdrop_path": "/cTNYRUTXkBgPH3wP3kmPUB5U6dA.jpg",
        "original_language": "en",
        "original_title": "Schindler's List",
        "genre_ids": [
            18,
            36,
            10752
        ],
        "title": "Schindler's List",
        "vote_average": 8.6,
        "overview": "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
        "release_date": "1993-11-30",
        "imdbID": "tt0108052"
    },
    {
        "popularity": 19.535,
        "vote_count": 4650,
        "video": false,
        "poster_path": "/xq1Ugd62d23K2knRUx6xxuALTZB.jpg",
        "id": 372058,
        "adult": false,
        "backdrop_path": "/7OMAfDJikBxItZBIug0NJig5DHD.jpg",
        "original_language": "ja",
        "original_title": "君の名は。",
        "genre_ids": [
            16,
            18,
            10749
        ],
        "title": "Your Name.",
        "vote_average": 8.5,
        "overview": "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.",
        "release_date": "2016-08-26",
        "imdbID": "tt5311514"
    },
    {
        "popularity": 25.903,
        "vote_count": 6408,
        "video": false,
        "poster_path": "/bVq65huQ8vHDd1a4Z37QtuyEvpA.jpg",
        "id": 240,
        "adult": false,
        "backdrop_path": "/gLbBRyS7MBrmVUNce91Hmx9vzqI.jpg",
        "original_language": "en",
        "original_title": "The Godfather: Part II",
        "genre_ids": [
            80,
            18
        ],
        "title": "The Godfather: Part II",
        "vote_average": 8.5,
        "overview": "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
        "release_date": "1974-12-20",
        "imdbID": "tt0071562"
    },
    {
        "popularity": 58.876,
        "vote_count": 1176,
        "video": false,
        "poster_path": "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        "id": 496243,
        "adult": false,
        "backdrop_path": "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
        "original_language": "ko",
        "original_title": "기생충",
        "genre_ids": [
            35,
            18,
            53
        ],
        "title": "Parasite",
        "vote_average": 8.5,
        "overview": "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
        "release_date": "2019-05-30",
        "imdbID": "tt6751668"
    },
    {
        "popularity": 24.904,
        "vote_count": 8060,
        "video": false,
        "poster_path": "/oRvMaJOmapypFUcQqpgHMZA6qL9.jpg",
        "id": 129,
        "adult": false,
        "backdrop_path": "/mnpRKVSXBX6jb56nabvmGKA0Wig.jpg",
        "original_language": "ja",
        "original_title": "千と千尋の神隠し",
        "genre_ids": [
            16,
            14,
            10751
        ],
        "title": "Spirited Away",
        "vote_average": 8.5,
        "overview": "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
        "release_date": "2001-07-20",
        "imdbID": "tt0245429"
    },
    {
        "popularity": 20.731,
        "vote_count": 9026,
        "video": false,
        "poster_path": "/sOHqdY1RnSn6kcfAHKu28jvTebE.jpg",
        "id": 497,
        "adult": false,
        "backdrop_path": "/Rlt20sEbOQKPVjia7lUilFm49W.jpg",
        "original_language": "en",
        "original_title": "The Green Mile",
        "genre_ids": [
            80,
            18,
            14
        ],
        "title": "The Green Mile",
        "vote_average": 8.5,
        "overview": "A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people's ailments. When the cell block's head guard, Paul Edgecomb, recognizes Coffey's miraculous gift, he tries desperately to help stave off the condemned man's execution.",
        "release_date": "1999-12-10",
        "imdbID": "tt0120689"
    },
    {
        "popularity": 556.715,
        "vote_count": 5288,
        "video": false,
        "poster_path": "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        "id": 475557,
        "adult": false,
        "backdrop_path": "/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
        "original_language": "en",
        "original_title": "Joker",
        "genre_ids": [
            80,
            18,
            53
        ],
        "title": "Joker",
        "vote_average": 8.5,
        "overview": "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
        "release_date": "2019-10-02",
        "imdbID": "tt7286456"
    },
    {
        "popularity": 33.664,
        "vote_count": 16614,
        "video": false,
        "poster_path": "/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
        "id": 680,
        "adult": false,
        "backdrop_path": "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
        "original_language": "en",
        "original_title": "Pulp Fiction",
        "genre_ids": [
            80,
            53
        ],
        "title": "Pulp Fiction",
        "vote_average": 8.5,
        "overview": "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
        "release_date": "1994-09-10",
        "imdbID": "tt0110912"
    },
    {
        "popularity": 12.065,
        "vote_count": 7795,
        "video": false,
        "poster_path": "/f7DImXDebOs148U4uPjI61iDvaK.jpg",
        "id": 637,
        "adult": false,
        "backdrop_path": "/bORe0eI72D874TMawOOFvqWS6Xe.jpg",
        "original_language": "it",
        "original_title": "La vita è bella",
        "genre_ids": [
            35,
            18
        ],
        "title": "Life Is Beautiful",
        "vote_average": 8.5,
        "overview": "A touching story of an Italian book seller of Jewish ancestry who lives in his own little fairy tale. His creative and happy life would come to an abrupt halt when his entire family is deported to a concentration camp during World War II. While locked up he tries to convince his son that the whole thing is just a game.",
        "release_date": "1997-12-20",
        "imdbID": "tt0118799"
    },
    {
        "popularity": 39.349,
        "vote_count": 20207,
        "video": false,
        "poster_path": "/pKKvCaL1TPTVtbI6EeliyND3api.jpg",
        "id": 155,
        "adult": false,
        "backdrop_path": "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
        "original_language": "en",
        "original_title": "The Dark Knight",
        "genre_ids": [
            28,
            80,
            18,
            53
        ],
        "title": "The Dark Knight",
        "vote_average": 8.4,
        "overview": "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
        "release_date": "2008-07-16",
        "imdbID": "tt0468569"
    },
    {
        "popularity": 29.343,
        "vote_count": 16089,
        "video": false,
        "poster_path": "/yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg",
        "id": 13,
        "adult": false,
        "backdrop_path": "/wMgbnUVS9wbRGAdki8fqxKU1O0N.jpg",
        "original_language": "en",
        "original_title": "Forrest Gump",
        "genre_ids": [
            35,
            18,
            10749
        ],
        "title": "Forrest Gump",
        "vote_average": 8.4,
        "overview": "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
        "release_date": "1994-07-06",
        "imdbID": "tt0109830"
    },
    {
        "popularity": 15.076,
        "vote_count": 2474,
        "video": false,
        "poster_path": "/x733R4ISI0RbKeHhVkXdTMFmTFr.jpg",
        "id": 311,
        "adult": false,
        "backdrop_path": "/vnT6HzjLSDrAweHn9xWykb8Ii6T.jpg",
        "original_language": "en",
        "original_title": "Once Upon a Time in America",
        "genre_ids": [
            80,
            18
        ],
        "title": "Once Upon a Time in America",
        "vote_average": 8.4,
        "overview": "A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.",
        "release_date": "1984-05-23",
        "imdbID": "tt0087843"
    },
    {
        "popularity": 27.432,
        "vote_count": 14083,
        "video": false,
        "poster_path": "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
        "id": 122,
        "adult": false,
        "backdrop_path": "/8BPZO0Bf8TeAy8znF43z8soK3ys.jpg",
        "original_language": "en",
        "original_title": "The Lord of the Rings: The Return of the King",
        "genre_ids": [
            28,
            12,
            14
        ],
        "title": "The Lord of the Rings: The Return of the King",
        "vote_average": 8.4,
        "overview": "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
        "release_date": "2003-12-01",
        "imdbID": "tt0167260"
    },
    {
        "popularity": 53.395,
        "vote_count": 5611,
        "video": false,
        "poster_path": "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
        "id": 324857,
        "adult": false,
        "backdrop_path": "/uUiId6cG32JSRI6RyBQSvQtLjz2.jpg",
        "original_language": "en",
        "original_title": "Spider-Man: Into the Spider-Verse",
        "genre_ids": [
            28,
            12,
            16,
            35,
            878
        ],
        "title": "Spider-Man: Into the Spider-Verse",
        "vote_average": 8.4,
        "overview": "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson \"Kingpin\" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension.",
        "release_date": "2018-12-06",
        "imdbID": "tt4633694"
    },
    {
        "popularity": 28.038,
        "vote_count": 17447,
        "video": false,
        "poster_path": "/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg",
        "id": 550,
        "adult": false,
        "backdrop_path": "/mMZRKb3NVo5ZeSPEIaNW9buLWQ0.jpg",
        "original_language": "en",
        "original_title": "Fight Club",
        "genre_ids": [
            18
        ],
        "title": "Fight Club",
        "vote_average": 8.4,
        "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
        "release_date": "1999-10-15",
        "imdbID": "tt0137523"
    },
    {
        "popularity": 22.851,
        "vote_count": 6169,
        "video": false,
        "poster_path": "/pwpGfTImTGifEGgLb3s6LRPd4I6.jpg",
        "id": 769,
        "adult": false,
        "backdrop_path": "/sw7mordbZxgITU877yTpZCud90M.jpg",
        "original_language": "en",
        "original_title": "GoodFellas",
        "genre_ids": [
            80,
            18
        ],
        "title": "GoodFellas",
        "vote_average": 8.4,
        "overview": "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway.",
        "release_date": "1990-09-12",
        "imdbID": "tt0099685"
    },
    {
        "popularity": 22.575,
        "vote_count": 5481,
        "video": false,
        "poster_path": "/81d8oyEFgj7FlxJqSDXWr8JH8kV.jpg",
        "id": 539,
        "adult": false,
        "backdrop_path": "/3md49VBCeqY6MSNyAVY6d5eC6bA.jpg",
        "original_language": "en",
        "original_title": "Psycho",
        "genre_ids": [
            18,
            27,
            53
        ],
        "title": "Psycho",
        "vote_average": 8.4,
        "overview": "When larcenous real estate clerk Marion Crane goes on the lam with a wad of cash and hopes of starting a new life, she ends up at the notorious Bates Motel, where manager Norman Bates cares for his housebound mother. The place seems quirky, but fine… until Marion decides to take a shower.",
        "release_date": "1960-06-16",
        "imdbID": "tt0054215"
    }
]

module.exports = defaultPopularVideos;