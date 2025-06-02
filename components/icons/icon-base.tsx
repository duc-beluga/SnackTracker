import Image from "next/image";

type RankIconBaseProp = {
  url: string;
  alt: string;
};
export default function RankIconBase({ url, alt }: RankIconBaseProp) {
  return <Image src={url} alt={alt} width={24} height={24} />;
}
