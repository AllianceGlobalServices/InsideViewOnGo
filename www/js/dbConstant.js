angular.module('db.config', [])
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
            name: 'userpref',
            columns: [
                {name: 'id', type: 'integer'},
                {name: 'pref_name', type: 'text'},
                {name: 'pref_value', type: 'text'}
            ]
        }
    ]
});
