// This is a Cloud Script function. "args" is set to the value of the "FunctionParameter"
// parameter of the ExecuteCloudScript API.
// (https://api.playfab.com/Documentation/Client/method/ExecuteCloudScript)
// "context" contains additional information when the Cloud Script function is called from a PlayStream action.
handlers.helloWorld = function (args, context) {

    // The pre-defined "currentPlayerId" variable is initialized to the PlayFab ID of the player logged-in on the game client.
    // Cloud Script handles authenticating the player automatically.
    var message = "Hello from the Server" + "!";

    // You can use the "log" object to write out debugging statements. It has
    // three functions corresponding to logging level: debug, info, and error. These functions
    // take a message string and an optional object.
    log.info(message);
    var inputValue = null;
    if (args && args.inputValue)
        inputValue = args.inputValue;
    log.debug("helloWorld executado com estes argumentos:", { input: args.inputValue });

message += inputValue;
    // The value you return from a Cloud Script function is passed back
    // to the game client in the ExecuteCloudScript API response, along with any log statements
    // and additional diagnostic information, such as any errors returned by API calls or external HTTP
    // requests. They are also included in the optional player_executed_cloudscript PlayStream event
    // generated by the function execution.
    // (https://api.playfab.com/playstream/docs/PlayStreamEventModels/player/player_executed_cloudscript)
    return { messageValue: playerStatResult };
};


handlers.logTest = function(args, context) {
    log.info("This is a log statement!", { what: "Here on business." });
    log.debug("This is a debug statement.", { who: "I am a doctor, sir" });
    log.error("This is... an error statement?", { why: "I'm here to fix the plumbing. Probably.", errCode: 123 });

    // http.request('https://httpbin.org/status/404', 'post', '', 'text/plain', null, true);
};

// this is to use title data
handlers.ServerGetTitleData_backup = function (args) {
    var request = {
        Key: "Challenge_123125",
        Value:"{\"1\":CD15E15CEC59DE6D}"
    };

    var playerStatResult = server.SetTitleData(request);
};

// this is to use title data
handlers.ServerSaveChallengeAndPlayersWhoSolvedIt = function (args) {
    
    //var inputValue = null;
    /*if (args && args.hasOwnProperty("inputValue"))
    {
        inputValue = args.inputValue;
        log.debug("inputValue found:", { input: args.inputValue });
    }*/

    if (args && args.hasOwnProperty("challengeID")) {
        //inputValue = args.challengeID;
        log.debug("challengeID found:", { input: args.challengeID });
    }
    if (args && args.hasOwnProperty("players")) {
        //inputValue = args.players;
        log.debug("players found:", { input: args.players });
    }

    //log.debug("ServerSaveChallengeAndPlayersWhoSolvedIt:", { input: args.inputValue });

    var request = {
        Key: args.challengeID,
        Value: args.players
    };

    var playerStatResult = server.SetTitleData(request);
    return { messageValue: playerStatResult };
};