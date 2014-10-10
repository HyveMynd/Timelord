var Routes = function(app, express){
    var self = this;
    var routes = require('../routes/index');
    var users = require('../routes/users');
    var accountRoutes = require('../routes/account');

//********* ROUTES **********//

    app.use('/api/users', users);
    app.use('/auth', accountRoutes);
    app.use('/', routes);



//********* ERROR HANDLERS **********//

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            console.log(err);
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    return self;
};

module.exports = Routes;