import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [movies, setMovies] = useState([])
    const [trendingMovies, setTrendingMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // Debounces the search term to prevent too many API requests
    // by waiting for the user to stop tying for 500ms
    useDebounce(
        () => setDebouncedSearchTerm(searchTerm),
        500,
        [searchTerm]
    )

    const fetchMovies = async (query = "") => {
        setIsLoading(true)
        setErrorMessage('')

        try {
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
            const response = await fetch(endpoint, API_OPTIONS)

            if (!response.ok) {
                throw new Error("Failed to fetch movies")
            }

            const data = await response.json()

            if (data.Response === 'False') {
                setErrorMessage(data.Error || 'Failed to fetch movies')
                setMovies([])
                return
            }

            const results = data.results || []

            setMovies(results)

            if (results.length > 0 && query) {
                await saveMovie(results[0])
            }

        } catch (error) {
            console.error(`Error fetching movies: ${error}`)
            setErrorMessage('Error fetching movies. Please try again later')
        } finally {
            setIsLoading(false)
        }
    }

    const saveMovie = async (movie) => {
        try {
            const BACKEND_ENDPOINT = 'http://192.168.1.223:8080'
            const BACKEND_OPTIONS = {
                method: "POST",
                body: JSON.stringify({
                    id: movie.id,
                    title: movie.title,
                    poster_path: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`
                }),
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json"
                },
            }
            const response = await fetch(BACKEND_ENDPOINT, BACKEND_OPTIONS)
        } catch (error) {
            console.error(`Error saving movies: ${error}`)
        }
    }

    const loadTrendingMovies = async () => {
        try {
            const BACKEND_ENDPOINT = 'http://192.168.1.223:8080'
            const BACKEND_OPTIONS = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json"
                },
            }

            const response = await fetch(BACKEND_ENDPOINT, BACKEND_OPTIONS)
            const body = await response.json()

            console.log(body.trendingMovies)

            setTrendingMovies(body.trendingMovies)
        } catch (error) {
            console.error(`Error saving movies: ${error}`)
        }
    }

    useEffect(() => {
        fetchMovies(searchTerm)
    }, [debouncedSearchTerm])

    useEffect(() => {
        loadTrendingMovies()
    }, [])

    return (
        <main>
            <div className="pattern">
            </div>
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                {trendingMovies.length > 0 && (
                    <section className='trending'>
                        <h2>Trending Movies</h2>
                        <ul>
                            {trendingMovies.map((movie, index) => (
                                <li key={movie.id}>
                                    <p>{index + 1}</p>
                                    <img src={movie.poster_path} alt={movie.title} />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <section className='all-movies'>

                    <h2>All Movies</h2>

                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className='text-red-500'>{errorMessage}</p>
                    ) : (
                        <ul>
                            {movies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}

                </section>
            </div>


        </main>
    )
}

export default App