import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-b from-blue-500 to-indigo-600">
      {/* Header Image */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkD7s6c1-jkyKuc6Yy3ch2HiApmciFhXacwQ&s"
          alt="TaxiRoam Hero"
          className="w-1/4 max-w-lg object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="bg-white py-10 px-6 rounded-t-3xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Get Started with <span className="text-indigo-600">TaxiRoam</span>
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Your one-stop solution for hassle-free ride bookings.
        </p>

        {/* Call to Action */}
        <div className="mt-6 flex justify-center">
          <Link to="/login" className="bg-indigo-600 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 shadow-md transition duration-200">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
