import { useEffect } from "react";



import { useDispatch, useSelector } from "react-redux";



import ProductCard from "../components/ProductCard";



import { fetchProducts } from "../redux/thunks/productThunks";



function Home() {

  const dispatch = useDispatch();



  const { products, loading, error } = useSelector(

    (state) => state.products

  );



  useEffect(() => {

    dispatch(fetchProducts());

  }, [dispatch]);



  return (

    <div>

      {/* Hero */}

      <section className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-12 mb-12 text-center shadow-xl">

        <h1 className="text-5xl font-extrabold mb-4">

          Modern MERN E-Commerce

        </h1>



        <p className="text-xl text-gray-300 mb-6">

          Discover premium products

        </p>

      </section>



      {/* Loading */}

      {loading && (

        <h2 className="text-2xl font-bold">

          Loading...

        </h2>

      )}



      {/* Error */}

      {error && (

        <div className="bg-red-200 p-4 rounded mb-4">

          {error}

        </div>

      )}



      {/* Products */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.map((product) => (

          <ProductCard

            key={product._id}

            product={product}

          />

        ))}

      </div>

    </div>

  );

}



export default Home;