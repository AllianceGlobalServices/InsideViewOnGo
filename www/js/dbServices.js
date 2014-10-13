angular.module('dbService', ['db.config'])
// DB wrapper
.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;
 
    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        //self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
        self.db = window.sqlitePlugin.openDatabase(DB_CONFIG.name, "1.0", "database", 1000000);
        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
 
            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
            
        });
    };
 
    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();
 
        self.db.transaction(function(transaction) {
                transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });
 
        return deferred.promise;
    };
 
    self.fetchAll = function(result) {
        var output = [];
 
        for (var i = 0; i < result.rows.length; i++) {
            console.log('Record: '+ i +' : '+ result.rows.item(i));
            output.push(result.rows.item(i));
        }
        
        return output;
    };
 
    self.fetch = function(result) {
        return result.rows.item(0);
    };
 
    return self;
})
// Resource service example
.factory('USER_PREF', function(DB) {
    var self = this;
    
    self.all = function() {
        return DB.query('SELECT * FROM userpref')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM userpref WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    self.updateByPrefId = function(id, value) {
        return DB.query('UPDATE userpref SET pref_value = ? WHERE id = ?', [value, id])
        .then(function(result){
            //console.log('upate successfull: ' + result);
            return DB.fetch(result);
        });
    };
    
    self.putData = function(id, prefName, prefValue) {        
        return DB.query('INSERT INTO userpref(id, pref_name, pref_value) VALUES (?,?,?)', [id, prefName, prefValue])
        .then(function(result){
            //console.log('insert successfull: ' + result);
            return result;
        });
    };
    return self;
});
