import { redirect } from "next/navigation";

export default function Home() {
  // /problems로 리다이렉트
  redirect("/problems");
}
