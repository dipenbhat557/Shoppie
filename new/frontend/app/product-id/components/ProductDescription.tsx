export default function ProductDescription() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-10/12 flex flex-col gap-2">
        <div className="text-xl font-bold">Description on this item</div>
        <ul className="list-disc">
          <li>
            ANC (up to 32 dB) - Listen to your playlists just the way you like
            it—without any background disturbances.
          </li>
          <li>
            Metallic + chrome finish - With a sheen that stands out, these
            aren’t your regular earbuds. They’re a style statement with a sleek
            finish.
          </li>
          <li>
            Up to 60 hours of playtime - Get your playlists queued and ready
            because these earbuds bring you incredible playtime.
          </li>
          <li>
            11mm driver - Made for all the audiophiles, these earbuds bring you
            a dynamic and well-balanced audio experience.
          </li>
          <li>
            Ultra low latency (up to 40ms) - From gaming to binge-watching, you
            deserve lag-free listening.
          </li>
          <li>
            Quad mic with ENC - For conversations that remove unnecessary
            distractions and put the spotlight on voice clarity.
          </li>
        </ul>
      </div>
    </div>
  );
}
