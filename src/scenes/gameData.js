const gameData = {
    "gameData": {
      "days": [
        //day 1
        {
          "articles": [
            {
              "category": "politics",
              "headlines": [
                { "title": 'Dictator Sucks 1 jhjh', "effect": -1 }, 
                { "title": 'Dictator is Neutral 1', "effect": 0 }, 
                { "title": 'Dictator is Cool 1', "effect": 5 }
              ],
              "size": 2
            },
            {
              "category": "sports",
              "headlines": [
                {"title": "basketball wins", "effect": 5 },
                {"title": "basketball sucks", "effect": -1 },
                {"title": "basketball is neutral", "effect": 0 }
              ]
            },
            {
                "category": "culture",
                "headlines": [
                  {"title": "culture wins", "effect": 5 },
                  {"title": "culture sucks", "effect": -1 },
                  {"title": "culture is neutral", "effect": 0 }
                ]
            },
            {
                "category": "sports",
                "headlines": [
                  {"title": "basketball wins", "effect": 5 },
                  {"title": "basketball sucks", "effect": -1 },
                  {"title": "basketball is neutral", "effect": 0 }
                ]
            },
            {
                "category": "sports",
                "headlines": [
                  {"title": "basketball wins", "effect": 5 },
                  {"title": "basketball sucks", "effect": -1 },
                  {"title": "basketball is neutral", "effect": 0 }
                ]
            },
            {
                "category": "sports",
                "headlines": [
                  {"title": "basketball wins", "effect": 5 },
                  {"title": "basketball sucks", "effect": -1 },
                  {"title": "basketball is neutral", "effect": 0 }
                ]
            },
            {
                "category": "sports",
                "headlines": [
                  {"title": "basketball wins", "effect": 5 },
                  {"title": "basketball sucks", "effect": -1 },
                  {"title": "basketball is neutral", "effect": 0 }
                ]
            }

          ],
          "messages":[
            {
              "category": "badjob",
              "message": [
                { "title": 'you are doing it wrong', "effect": -1 }, 
                { "title": 'non non non', "effect": 0 }, 
                { "title": 'your family will be very sad', "effect": 5 }
              ],
            },
            {
              "category": "excellent",
              "message": [
                {"title": "we will win wins", "effect": 5 },
                {"title": "best champions", "effect": -1 },
                {"title": "very cool", "effect": 0 }
              ]
            },
            {
                "category": "neutral",
                "message": [
                  {"title": "neutral result", "effect": 5 },
                  {"title": "no enought", "effect": -1 },
                  {"title": "dont be neutral", "effect": 0 }
                ]
            }
          ]
        },
        // day 2
        {
            "articles": [
              {
                "category": "politics",
                "headlines": [
                  { "title": 'Dictator Sucks 2', "effect": -1 }, 
                  { "title": 'Dictator is Neutral 2', "effect": 0 }, 
                  { "title": 'Dictator is Cool 2', "effect": 5 }
                ],
                "size": 2
              },
              {
                "category": "sports",
                "headlines": [
                  {"title": "basketball wins 2", "effect": 5 },
                  {"title": "basketball sucks 2", "effect": -1 },
                  {"title": "basketball is neutral 2", "effect": 0 }
                ]
              },
              {
                  "category": "culture",
                  "headlines": [
                    {"title": "culture wins 2", "effect": 5 },
                    {"title": "culture sucks 2", "effect": -1 },
                    {"title": "culture is neutral 2", "effect": 0 }
                  ]
              },
              {
                  "category": "sports",
                  "headlines": [
                    {"title": "basketball wins", "effect": 5 },
                    {"title": "basketball sucks", "effect": -1 },
                    {"title": "basketball is neutral", "effect": 0 }
                  ]
              },
              {
                  "category": "sports",
                  "headlines": [
                    {"title": "basketball wins 2", "effect": 5 },
                    {"title": "basketball sucks", "effect": -1 },
                    {"title": "basketball is neutral", "effect": 0 }
                  ]
              },
              {
                  "category": "sports",
                  "headlines": [
                    {"title": "basketball wins 2", "effect": 5 },
                    {"title": "basketball sucks", "effect": -1 },
                    {"title": "basketball is neutral", "effect": 0 }
                  ]
              },
              {
                  "category": "sports",
                  "headlines": [
                    {"title": "basketball wins 2", "effect": 5 },
                    {"title": "basketball sucks", "effect": -1 },
                    {"title": "basketball is neutral", "effect": 0 }
                  ]
              }
  
            ],

            "messages":[
              {
                "category": "badjob",
                "message": [
                  { "title": 'you are doing it wrong 2', "effect": -1 }, 
                  { "title": 'non non non 2', "effect": 0 }, 
                  { "title": 'your family will be very sad 2', "effect": 5 }
                ],
              },
              {
                "category": "excellent",
                "message": [
                  {"title": "we will win wins 2", "effect": 5 },
                  {"title": "best champions 2", "effect": -1 },
                  {"title": "very cool 2", "effect": 0 }
                ]
              },
              {
                  "category": "neutral",
                  "message": [
                    {"title": "neutral result 2", "effect": 5 },
                    {"title": "no enought 2", "effect": -1 },
                    {"title": "dont be neutral 2", "effect": 0 }
                  ]
              }
            ]

          }
      ],
    },
    "gameState": {
      "currentDay": 1,
      "maxDay" : 1,
      "selected": [
        { "article": "<link to article object>", "headline": 1 },
        { "article": "<link to article object>", "headline": 0 }
      ],
      "history": [
        {
          "selected": "<link to selected array>"
        }
        // ... additional history entries
      ]
    }
  };

  export default gameData;
  