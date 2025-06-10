import {
  GoldenIdolIcon,
  DustyPouchIcon,
  RunestoneIcon,
  BronzeGauntletIcon,
  SilverDaggerIcon,
  CopperCompassIcon,
  AncientMapIcon,
  MythrilKeyIcon,
  DragonHoardIcon,
  JeweledChaliceIcon,
} from "@/components/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Coins } from "lucide-react";

export default function LeaderboardPage() {
  const leaderboardData = [
    {
      username: "dnguyen",
      rankIcon: <DragonHoardIcon />,
      rankName: "Dragon Hoard",
      tokens: 123,
    },
    {
      username: "sally",
      rankIcon: <MythrilKeyIcon />,
      rankName: "Mythril Key",
      tokens: 98,
    },
    {
      username: "alex",
      rankIcon: <AncientMapIcon />,
      rankName: "Ancient Map",
      tokens: 85,
    },
    {
      username: "emma",
      rankIcon: <JeweledChaliceIcon />,
      rankName: "Jeweled Chalice",
      tokens: 72,
    },
    {
      username: "liam",
      rankIcon: <GoldenIdolIcon />,
      rankName: "Golden Idol",
      tokens: 60,
    },
    {
      username: "olivia",
      rankIcon: <SilverDaggerIcon />,
      rankName: "Silver Dagger",
      tokens: 55,
    },
    {
      username: "noah",
      rankIcon: <CopperCompassIcon />,
      rankName: "Copper Compass",
      tokens: 50,
    },
    {
      username: "ava",
      rankIcon: <BronzeGauntletIcon />,
      rankName: "Bronze Gauntlet",
      tokens: 45,
    },
    {
      username: "lucas",
      rankIcon: <RunestoneIcon />,
      rankName: "Runestone",
      tokens: 40,
    },
    {
      username: "mia",
      rankIcon: <DustyPouchIcon />,
      rankName: "Dusty Pouch",
      tokens: 38,
    },
  ];

  return (
    <div className="flex justify-center p-2 py-6">
      <div className="w-full max-w-3xl">
        <Table>
          <TableCaption>Leaderboard - Top Hunters</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">#</TableHead>
              <TableHead>Hunter</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Coins size={18} className="text-yellow-600" />
                  <span className="text-sm sm:text-base font-semibold text-yellow-800">
                    Tokens
                  </span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="font-medium">{item.username}</TableCell>
                <TableCell className="flex items-center gap-2">
                  {item.rankIcon}
                  <span>{item.rankName}</span>
                </TableCell>
                <TableCell className="text-right">{item.tokens}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
