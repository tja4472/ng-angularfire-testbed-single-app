"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var firebase = require("@firebase/testing");
var fs = require("fs");
var projectId = 'emulators-codelab-a5a89';
var rules = fs.readFileSync('test-security-rules/firestore.test.rules', 'utf8');
var coverageUrl = "http://localhost:8080/emulator/v1/projects/" + projectId + ":ruleCoverage.html";
var myId = 'user_abc';
var theirId = 'user_xyz';
var myAuth = { uid: myId, email: 'abc@gamil.com' };
function getFirestore(auth) {
    return firebase.initializeTestApp({ projectId: projectId, auth: auth }).firestore();
}
// initializeAdminApp ignores rules
function getAdminFirestore() {
    return firebase.initializeAdminApp({ projectId: projectId }).firestore();
}
describe('test security rules', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, firebase.loadFirestoreRules({ projectId: projectId, rules: rules })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Clear the database between tests
                return [4 /*yield*/, firebase.clearFirestoreData({ projectId: projectId })];
                case 1:
                    // Clear the database between tests
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    /* ??
    afterEach(async () => {
      // Clear the database between tests
      await firebase.clearFirestoreData({ projectId });
    });
  */
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // await Promise.all(firebase.apps().map((app) => app.delete()));
            // await firebase.clearFirestoreData({ projectId });
            console.log("View rule coverage information at " + coverageUrl + "\n");
            return [2 /*return*/];
        });
    }); });
    it('should create the app', function () {
        expect(true).toBeTruthy();
    });
    it('require users to log in before creating a profile', function () { return __awaiter(void 0, void 0, void 0, function () {
        var db, profile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = getFirestore(null);
                    profile = db.collection('users').doc('alice');
                    return [4 /*yield*/, firebase.assertFails(profile.set({ birthday: 'January 1' }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should enforce the createdAt date in user profiles', function () { return __awaiter(void 0, void 0, void 0, function () {
        var db, profile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = getFirestore({ uid: 'alice' });
                    profile = db.collection('users').doc('alice');
                    return [4 /*yield*/, firebase.assertFails(profile.set({ birthday: 'January 1' }))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, firebase.assertSucceeds(profile.set({
                            birthday: 'January 1',
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should only let users create their own profile', function () { return __awaiter(void 0, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = getFirestore({ uid: 'alice' });
                    return [4 /*yield*/, firebase.assertSucceeds(db.collection('users').doc('alice').set({
                            birthday: 'January 1',
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        }))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, firebase.assertFails(db.collection('users').doc('bob').set({
                            birthday: 'January 1',
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should let anyone read any profile', function () { return __awaiter(void 0, void 0, void 0, function () {
        var db, profile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = getFirestore(null);
                    profile = db.collection('users').doc('alice');
                    return [4 /*yield*/, firebase.assertSucceeds(profile.get())];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should let anyone create a room', function () { return __awaiter(void 0, void 0, void 0, function () {
        var db, room;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = getFirestore({ uid: 'alice' });
                    room = db.collection('rooms').doc('firebase');
                    return [4 /*yield*/, firebase.assertSucceeds(room.set({
                            owner: 'alice',
                            topic: 'All Things Firebase'
                        }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should force people to name themselves as room owner when creating a room', function () { return __awaiter(void 0, void 0, void 0, function () {
        var db, room;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = getFirestore({ uid: 'alice' });
                    room = db.collection('rooms').doc('firebase');
                    return [4 /*yield*/, firebase.assertFails(room.set({
                            owner: 'scott',
                            topic: 'Firebase Rocks!'
                        }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not let one user steal a room from another user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var alice, bob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alice = getFirestore({ uid: 'alice' });
                    bob = getFirestore({ uid: 'bob' });
                    return [4 /*yield*/, firebase.assertSucceeds(bob.collection('rooms').doc('snow').set({
                            owner: 'bob',
                            topic: 'All Things Snowboarding'
                        }))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, firebase.assertFails(alice.collection('rooms').doc('snow').set({
                            owner: 'alice',
                            topic: 'skiing > snowboarding'
                        }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
// https://firebaseonair.withgoogle.com/events/firebase-live20/watch?talk=security-rules-with-emulator-suite
describe('Unit testing security rules with the new Firebase emulator suite.', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, firebase.loadFirestoreRules({ projectId: projectId, rules: rules })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Clear the database between tests
                return [4 /*yield*/, firebase.clearFirestoreData({ projectId: projectId })];
                case 1:
                    // Clear the database between tests
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // =============================
    it('Can read a single public post', function () { return __awaiter(void 0, void 0, void 0, function () {
        var admin, postId, setupDoc, db, testRead;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    admin = getAdminFirestore();
                    postId = 'public_post';
                    setupDoc = admin.collection('aposts').doc(postId);
                    return [4 /*yield*/, setupDoc.set({ authorId: theirId, visibility: 'public' })];
                case 1:
                    _a.sent();
                    db = getFirestore(null);
                    testRead = db.collection('aposts').doc(postId);
                    return [4 /*yield*/, firebase.assertSucceeds(testRead.get())];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Can read a private post belonging to the user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var admin, postId, setupDoc, db, testRead;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    admin = getAdminFirestore();
                    postId = 'private_post';
                    setupDoc = admin.collection('aposts').doc(postId);
                    return [4 /*yield*/, setupDoc.set({ authorId: myId, visibility: 'private' })];
                case 1:
                    _a.sent();
                    db = getFirestore(myAuth);
                    testRead = db.collection('aposts').doc(postId);
                    return [4 /*yield*/, firebase.assertSucceeds(testRead.get())];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Can't read a private post belonging to another user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var admin, postId, setupDoc, db, testRead;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    admin = getAdminFirestore();
                    postId = 'private_post';
                    setupDoc = admin.collection('aposts').doc(postId);
                    return [4 /*yield*/, setupDoc.set({ authorId: theirId, visibility: 'private' })];
                case 1:
                    _a.sent();
                    db = getFirestore(myAuth);
                    testRead = db.collection('aposts').doc(postId);
                    return [4 /*yield*/, firebase.assertFails(testRead.get())];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
/*
  it('require users to log in before creating a profile', async () => {
  });
*/
// https://github.com/firebase/quickstart-nodejs/blob/master/firestore-emulator/typescript-quickstart/test/test.ts
