import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

function Song({ track, order }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div
      onClick={playSong}
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          src={
            track.track.album.images[0].url ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAeFBMVEUAAAAe12Af3mMf22IdzlwUkEAPbDAZsU8g4mUbv1Ud0V0ZtVESfjgMVSYaulMKSiEGLRQVl0McxFcYrE0WnkYEGwwXpEkJPxwUiz4MWSgHMRYIOxoShDsLUSQINhgOZi0QdDQNXyoDFwoGKBIFIg8EHg0CEQcBCQT6adJuAAAD9klEQVR4nO2Za5eiMAyGoSm3giKF4SYoOo7+/3+45SZFUXFOcPec7fNpDnboS5ImaatpCoVCoVAoFAqFQqFQKBT/N8c88bPMT/KvvzL9JjMshzJdwCh3g0P+YQGVxQgB0DsAiM1c73PzJxGQ6+wDQEhcfkZArE/M31vD8pdXkDLySEAjQg+OywrY8qcCaghNllRQwUMfyDGRLqcgmCGgEREvpSB+6YSrM9yFFNhzFSylIZptg0ZDiK/AmxkHPWBgK0jeskGNneEqONM3jVDzjSoheNsI2OHg37wdBKSl/vOBhQDTFdaoLAPlVhQYLUFscQq2PVE7geMpyLrXixrtxIV/7+Nvv4pcSm5lgIkmwYXuq7zkcYt2yUvDYSOn4Jnh1KVF9jrEt54jm8LGKppGuxygmDV6GwwdBUQ4Cs5O+11kbm94Smkvgp5QJCT9J/Ul+LRZeYURx+7ajaOg8LL8dB7/y6Yv62SFIsHrKyQRnvipgrVuXxNCmx1s3QmLceeatnYgOJUivMYX0bncusuxX6eLtTf0rhvaPkcp2n0otK+cmH74kTCn6lbNiXbBsEGQsKMT39yn59YfsgqaNnFx6B4yjKa+vP1U4Y4w8CpzLzCrIraoLuVFkUG9o3bo7UX2CBL2svEJDQv/eBmPuHxlhSWlZ2BsCB+MHG3Kdbp46NpNFtCJSJ2dTGZKAOvpyIvp2rcisCW83qOcxI53WSs4zZNdaaah5a6547ph7B182TvbeOQObAk6hP4qWIsOpcuNTX60deqm5RCi2UhChSBh9MY6H0weLdg0urZpqTQCZUUk7H7KCYQ5qNemRlMWiVGnvvn0jNAnR8kWtKhToyVJYFsECX3bNnytqEjcsaLUMNIgXPMmMnoR3Mzk3S9wlAOP0R5CpMd0f5Of8irifQcteulR7ODsJTJJAjEvk2POu5RPVXG7QpGwGeIR6ONh54M1IQIlFOSeRe8k/JR7L4gEQbH3h6atdG+OIGCNo0DLhheTMDNF5yYi8Nq42cDiqm/WV+PmAiUxNTBp4en3x571wnTNNidU4+WDpUArXu/sweZNu3QYrYcATcLPnNMF0TlWWu6MRu7QJGjerOMFADbqb5E6+JYfZ4YZ7hShdM9XVr84ZbHxtvYNxtsaCNKWduBdVzxLpL9k996ZG7AFbkeS57u5WwnIp46dBjZbA8BhCQWa5s/1BeiL2KAmeX0nU0Pokrdk0d126R47nG5rsNjTF4YgbPHrytx4tjIAIqQ+6SnbeHI70+xzwg9cUzYcC37XuIj5eYp7/P+cs5+69eEK6U7ddLo2ys/f3+cr04tCQVSY2afv7RUKhUKhUCgUCoVCoVAo/i3+AL9SLsQLlFSgAAAAAElFTkSuQmCC"
          }
          alt=""
          className="h-10 w-10"
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline w-40">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
