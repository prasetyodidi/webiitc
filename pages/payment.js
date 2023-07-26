import GetDetailCompetitionsApi from "@/api/homepage/GetDetailCompetitionApi";
import PayApi from "@/api/payment/Pay";
import GetDetailTeam from "@/api/team/GetDetail";
import { Button } from "@/components";
import Alert from "@/components/atoms/Alert";
import FileInput from "@/components/atoms/FilePond";
import Logo from "@/components/atoms/Logo";
import Text from "@/components/atoms/Text";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiFillWarning,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const Payment = () => {
  const [isSucces, setIsSucces] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [Message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [isHitTeam, setIsHitTeam] = useState(false);
  const [isHitPay, setIsHitPay] = useState(false);
  const [competition, setCompetition] = useState({});
  const [isHitCompetition, setIsHitCompetition] = useState(true);
  const [team, setTeam] = useState({});
  const router = useRouter();
  const id = router.query?.i;
  const cSlug = router.query?.sl;
  const getDetailTeam = () => {
    setIsHitTeam(true);
    GetDetailTeam({ id })
      .then((res) => {
        console.log(res);
        setTeam(res.data?.team);
        setIsHitTeam(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (id) {
      getDetailTeam();
    }
    console.log(cSlug);
    if (cSlug) {
      setIsHitCompetition(true);
      GetDetailCompetitionsApi({ slug: cSlug })
        .then((res) => {
          console.log(res);
          setCompetition(res.data?.competition);
          setIsHitCompetition(false);
        })
        .catch((err) => console.log(err));
    }
  }, [router.isReady]);
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  function formatDate(date) {
    const dayIndex = date.getDay();
    const day = days[dayIndex];
    const dateNumber = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const year = date.getFullYear();

    return `${day}, ${dateNumber} ${month} ${year}`;
  }

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const handlePay = (e) => {
    e.preventDefault();
    setIsHitPay(true);
    PayApi({ id, proveOfPayment: image })
      .then((res) => {
        console.log(res);
        setMessage(res.message);
        if (res.status == 1) {
          setIsSucces(true);
          router.replace(`/team?i=${id}&sl=${cSlug}`);
        } else {
          setIsWrong(true);
          setIsHitPay(false);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div
        style={{ backgroundImage: `url('${competition.cover}')` }}
        className="h-48 bg-cover  relative bg-center bg-no-repeat"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="w-11/12 max-w-[500px] left-1/2 -translate-x-1/2 absolute bottom-3">
          <Text size={"smalltitle"} weight={"bold"} color={"white"}>
            {competition.name}
          </Text>
          <div className="flex space-x-2 my-1">
            <Text color={"white"}>Tanggal: </Text>
            <Text color={"white"} weight={"bold"}>
              {formattedDate}
            </Text>
          </div>
          <Text size={"smalltitle"} weight={"bold"} color={"white"}>
            Rp {competition?.competitionPrice?.toLocaleString("id-ID")}
          </Text>
        </div>
      </div>
      <form
        onSubmit={handlePay}
        className="w-11/12 max-w-[500px] mx-auto pb-12 overflow-hidden"
      >
        <Alert onClose={() => setIsSucces(false)} isOpen={isSucces}>
          <AiFillCheckCircle className="text-green-400 text-xl" />
          <p>{Message}</p>
        </Alert>
        <Alert onClose={() => setIsWrong(false)} isOpen={isWrong}>
          <AiFillWarning className="text-red text-xl" />
          <p>{Message}</p>
        </Alert>

        <div className="flex justify-between items-center my-8">
          <div className="flex items-center justify-start space-x-3">
            {team.avatar ? (
              <img
                src={team.avatar}
                alt="Buaya"
                width={1080}
                height={1080}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-200 animate-pulse"></div>
            )}
            <div>
              <Text size={"smalltitle"} color={"black"}>
                Tim {team.name}
              </Text>
              <Text>Kapten {team?.leader?.name}</Text>
            </div>
          </div>
          <div className=" text-green-500">Pembayaran</div>
        </div>

        {/* <div className="mb-6">
        <Text color={"black"} weight={"bold"}>
          Item Detail
        </Text>
        <Text>Pembayaran Lomba</Text>
      </div> */}

        <div className="py-6 border-y flex justify-center items-center space-x-3">
          {/* <Logo /> */}
          <Text color={"black"} size={"cardtitle"} weight={"bold"}>
            Metode Pembayaran
          </Text>
        </div>

        <ul className="space-y-6 my-6 border-b pb-6">
          {paymentMethods.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <Image
                src={item.img}
                alt={item.value}
                width={1080}
                height={1080}
                className="w-28"
              />
              <Text>{item.value}</Text>
            </li>
          ))}
        </ul>
        <FileInput
          placeholder="Upload bukti pembayaran"
          className="bg-slate-200"
          image={image}
          setImage={setImage}
        />

        <Button isSquare additionals={"w-full"} size={"md"} color={"oren"}>
          {isHitPay ? (
            <AiOutlineLoading3Quarters className="text-xl mx-auto text-white animate-spin" />
          ) : (
            "Kirim Bukti Pembayaran"
          )}
        </Button>
        <Button
          isSquare
          additionals={"w-full mt-4"}
          size={"md"}
          color={"outlinedark"}
          onClick={() => router.replace(`/team?i=${id}&sl=${cSlug}`)}
        >
          Batal
        </Button>
      </form>
    </>
  );
};

export default Payment;

const paymentMethods = [
  {
    img: "/images/dana.png",
    value: "088812718721",
  },
  {
    img: "/images/mandiri.png",
    value: "12345-12170-1281",
  },
];