import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export default async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    console.log(searchParams.values());

    const date = searchParams.get("date") || "";
    const title = searchParams.has("title")
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";
    const website = searchParams.get("website") || "https://francisudeji.dev";
    const slug = searchParams.get("slug") || "";

    return new ImageResponse(
      (
        <div tw="h-full w-full flex items-start justify-start border border-black border-[24px] bg-slate-100">
          <div tw="flex items-start justify-start h-full">
            <div tw="flex flex-col justify-between w-full h-full">
              <div tw="p-20 flex flex-col">
                <p tw="pl-2 text-left text-base">Published on {date}</p>
                <h1 tw="text-[80px] font-black text-left">{title}</h1>
              </div>
              <div tw="text-2xl pb-10 px-20 mb-0 flex items-center">
                <span tw="font-bold">{website}</span>
                <span tw="font-normal text-[#334155]">/blog/{slug}</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 2400,
        height: 1256,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
