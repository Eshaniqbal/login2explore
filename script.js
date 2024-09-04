const jpdbBaseURL = "http://localhost:3000";

const jpdbIRL = "/api/irl";
const jpdbIML = "/api/iml";
const dbName = "Test";
const relName = "test-rel";
const token = "90932067|-31949218209109586|90962414";

function createRecord() {
    let recordId = document.getElementById("recordId").value;
    let recordData = document.getElementById("recordData").value;
    
    let jsonObj = {
        id: recordId,
        data: recordData
    };
    
    let reqString = createPUTRequest(token, JSON.stringify(jsonObj), dbName, relName);
    
    executeCommand(reqString, jpdbIML).then(response => {
        document.getElementById("result").innerHTML = JSON.stringify(response);
    });
}

function readRecord() {
    let recordId = document.getElementById("recordId").value;
    
    let reqString = createGET_BY_KEYRequest(token, dbName, relName, JSON.stringify({ id: recordId }));
    
    executeCommand(reqString, jpdbIRL).then(response => {
        document.getElementById("result").innerHTML = JSON.stringify(response);
    });
}

function updateRecord() {
    let recordId = document.getElementById("recordId").value;
    let recordData = document.getElementById("recordData").value;
    
    let jsonObj = {
        id: recordId,
        data: recordData
    };
    
    let reqString = createUPDATERecordRequest(token, JSON.stringify(jsonObj), dbName, relName, JSON.stringify({ id: recordId }));
    
    executeCommand(reqString, jpdbIML).then(response => {
        document.getElementById("result").innerHTML = JSON.stringify(response);
    });
}

function deleteRecord() {
    let recordId = document.getElementById("recordId").value;
    
    let reqString = createDELETERecordRequest(token, dbName, relName, JSON.stringify({ id: recordId }));
    
    executeCommand(reqString, jpdbIML).then(response => {
        document.getElementById("result").innerHTML = JSON.stringify(response);
    });
}

// Helper functions to interact with JsonPowerDB
function createPUTRequest(token, jsonObj, dbName, relName) {
    return JSON.stringify({
        token: token,
        cmd: "PUT",
        dbName: dbName,
        rel: relName,
        jsonStr: jsonObj
    });
}

function createGET_BY_KEYRequest(token, dbName, relName, jsonObj) {
    return JSON.stringify({
        token: token,
        cmd: "GET_BY_KEY",
        dbName: dbName,
        rel: relName,
        jsonStr: jsonObj
    });
}

function createUPDATERecordRequest(token, jsonObj, dbName, relName, reqStr) {
    return JSON.stringify({
        token: token,
        cmd: "UPDATE",
        dbName: dbName,
        rel: relName,
        jsonStr: jsonObj,
        reqStr: reqStr
    });
}

function createDELETERecordRequest(token, dbName, relName, reqStr) {
    return JSON.stringify({
        token: token,
        cmd: "REMOVE",
        dbName: dbName,
        rel: relName,
        reqStr: reqStr
    });
}

async function executeCommand(reqString, apiUrl) {
    try {
        const response = await fetch(jpdbBaseURL + apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: reqString
        });
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return { error: "Error executing command" };
    }
}
