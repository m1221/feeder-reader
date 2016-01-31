/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds
         * object and ensures it has a URL defined and that
         * the URL is not empty.
         */
        it('has a url for each feed', function(){
           var feedLength = allFeeds.length;
           for(var i = 0; i < feedLength; i++){
               expect(allFeeds[i].url).toBeDefined();
               expect(allFeeds[i].url.length).not.toBe(0);
           }
        });


        /* This test loops through each feed in the allFeeds
         * object and ensures it has a name defined and that
         * the name is not empty.
         */
        it('has a name for each feed', function(){
           var feedLength = allFeeds.length;
           for(var i = 0; i < feedLength; i++){
               expect(allFeeds[i].name).toBeDefined();
               expect(allFeeds[i].name.length).not.toBe(0);
           }
        });
    });


    /* This test suite is to check if the menu behaves as it should.
     * If the menu is hidden on load.
     * If the menu displays/hides on click.
     */
    describe('The menu', function() {
        var body = $('body'),
            menuIcon = $('.menu-icon-link');
    

        /* This test checks to see if the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* This test checks to see if the menu changes visibility
         * when the menu icon is clicked. This test has two expectations.
         * Does the menu display when clicked and does it hide when 
         * clicked again.
         */
        it('toggles visiblity when clicked', function() {
            // When the page loads, body has the class 'menu-hidden'
            // clicking it will take away the class
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });
    /* The test suite "Initial Entries" checks if our asynchronous
     * requests work correctly. */
    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(0, function(){
                return done();
            });
        });
        
        /* This test checks to see that when the loadFeed
         * function is called it completes its work (there is at least
         * a single .entry element within the .feed container).
         */
        it('has at least one entry in feed container', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* This test suite "New Feed Selection" checks is our asynchronous requests
     * are working correctly and that they are displaying correctly */
    describe('New Feed Selection', function() {
        var feedBefore;
        
        beforeEach(function(done){
            // take a snapshot of the feed before requesting requesting/
            // loading a new feed.
            feedBefore = $('.feed').html(); 
            
            // loadFeed was first called with 0 as the first parameter
            // to get a different feed we call it with 1
            loadFeed(1, function(){
                return done();
            });
        });
        /* This test checks to see that the loadFeed function
         * actually changes the content on the page
         */
        it('loads new feeds', function(done) {
            expect($('.feed').html()).not.toEqual(feedBefore);
            done();
        });
    });
}());
