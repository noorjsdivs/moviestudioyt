import MovieContainer from "@/components/MovieContainer";
import VideoPlayer from "@/components/VideoPlayer";
import { getImagePath } from "@/lib/getImagePath";
import {
  getMovieDetails,
  getMovieVideos,
  getPopularMovies,
} from "@/lib/getMovies";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Movie Studio Clone || Movie Details page",
};

interface Props {
  params: {
    id: string;
  };
}

const MovieDetails = async ({ params: { id } }: Props) => {
  const movies = await getMovieVideos(id);
  const videos = movies.map((movie: any) => ({
    id: movie.id,
    iso_639_1: movie.iso_639_1,
    iso_3166_1: movie.iso_3166_1,
    key: movie.key,
    name: movie.name,
    official: movie.official,
    published_at: movie.published_at,
    site: movie.site,
    size: movie.size,
    type: movie.type,
  }));
  const details: any = await getMovieDetails(id);
  const popoularMovies = await getPopularMovies();

  return (
    <div>
      <div className="px-10">
        <div className="py-10 flex flex-col lg:flex-row items-center gap-5">
          <div className="w-full lg:w-1/2 min-h-96 rounded-md overflow-hidden group">
            <Image
              src={getImagePath(details?.backdrop_path)}
              alt={details?.title}
              width={1920}
              height={1080}
              className="w-full h-full object-cover shadow-md shadow-gray-900 drop-shadow-xl group-hover:scale-110 duration-500"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold underline decoration-[1px]">
              {details?.original_title}
            </h2>
            <p className="text-sm leading-6 tracking-wide mt-2">
              {details?.overview}
            </p>
            <p className="text-gray-200 text-sm">
              IMDB:{" "}
              <span className="text-white font-medium">
                {details.vote_average}
              </span>
            </p>
            <p className="text-gray-200 text-sm">
              Votes:{" "}
              <span className="text-white font-medium">
                {details.vote_count}
              </span>
            </p>
            <p className="text-gray-200 text-sm">
              Release Data:{" "}
              <span className="text-white font-medium">
                {details.release_date}
              </span>
            </p>
            <p className="text-gray-200 text-sm">
              Genres:{" "}
              {details?.genres.map((item: any) => (
                <span key={item?.id} className="text-white font-medium mr-1">
                  {item?.name},
                </span>
              ))}
            </p>
            <p className="text-gray-200 text-sm">
              Tag Line:{" "}
              <span className="text-white font-medium">{details.tagline}</span>
            </p>
            <p className="text-gray-200 text-sm">
              Status:{" "}
              <span
                className={`font-medium ${
                  details?.status === "Released"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {details.status}
              </span>
            </p>
          </div>
        </div>
        <VideoPlayer videos={videos} />
      </div>
      <div className="mt-6">
        <MovieContainer
          movies={popoularMovies}
          title="Popular Movies"
          isVertical
        />
      </div>
    </div>
  );
};

export default MovieDetails;
