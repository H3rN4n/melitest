'use strict';

(function() {
  // Melis Controller Spec
  describe('Melis Controller Tests', function() {
    // Initialize global variables
    var MelisController,
      scope,
      $httpBackend,
      $stateParams,
      $location;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function() {
      jasmine.addMatchers({
        toEqualData: function(util, customEqualityTesters) {
          return {
            compare: function(actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;

      // Initialize the Melis controller.
      MelisController = $controller('MelisController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one Meli object fetched from XHR', inject(function(Melis) {
      // Create sample Meli using the Melis service
      var sampleMeli = new Melis({
        name: 'New Meli'
      });

      // Create a sample Melis array that includes the new Meli
      var sampleMelis = [sampleMeli];

      // Set GET response
      $httpBackend.expectGET('api/melis').respond(sampleMelis);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.melis).toEqualData(sampleMelis);
    }));

    it('$scope.findOne() should create an array with one Meli object fetched from XHR using a meliId URL parameter', inject(function(Melis) {
      // Define a sample Meli object
      var sampleMeli = new Melis({
        name: 'New Meli'
      });

      // Set the URL parameter
      $stateParams.meliId = '525a8422f6d0f87f0e407a33';

      // Set GET response
      $httpBackend.expectGET(/api\/melis\/([0-9a-fA-F]{24})$/).respond(sampleMeli);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.meli).toEqualData(sampleMeli);
    }));

    it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Melis) {
      // Create a sample Meli object
      var sampleMeliPostData = new Melis({
        name: 'New Meli'
      });

      // Create a sample Meli response
      var sampleMeliResponse = new Melis({
        _id: '525cf20451979dea2c000001',
        name: 'New Meli'
      });

      // Fixture mock form input values
      scope.name = 'New Meli';

      // Set POST response
      $httpBackend.expectPOST('api/melis', sampleMeliPostData).respond(sampleMeliResponse);

      // Run controller functionality
      scope.create();
      $httpBackend.flush();

      // Test form inputs are reset
      expect(scope.name).toEqual('');

      // Test URL redirection after the Meli was created
      expect($location.path()).toBe('/melis/' + sampleMeliResponse._id);
    }));

    it('$scope.update() should update a valid Meli', inject(function(Melis) {
      // Define a sample Meli put data
      var sampleMeliPutData = new Melis({
        _id: '525cf20451979dea2c000001',
        name: 'New Meli'
      });

      // Mock Meli in scope
      scope.meli = sampleMeliPutData;

      // Set PUT response
      $httpBackend.expectPUT(/api\/melis\/([0-9a-fA-F]{24})$/).respond();

      // Run controller functionality
      scope.update();
      $httpBackend.flush();

      // Test URL location to new object
      expect($location.path()).toBe('/melis/' + sampleMeliPutData._id);
    }));

    it('$scope.remove() should send a DELETE request with a valid meliId and remove the Meli from the scope', inject(function(Melis) {
      // Create new Meli object
      var sampleMeli = new Melis({
        _id: '525a8422f6d0f87f0e407a33'
      });

      // Create new Melis array and include the Meli
      scope.melis = [sampleMeli];

      // Set expected DELETE response
      $httpBackend.expectDELETE(/api\/melis\/([0-9a-fA-F]{24})$/).respond(204);

      // Run controller functionality
      scope.remove(sampleMeli);
      $httpBackend.flush();

      // Test array after successful delete
      expect(scope.melis.length).toBe(0);
    }));
  });
}());