export default function Header() {
  const features = [
    {
      icon: "🖼",
      title: "PNG Export",
    },
    {
      icon: "🌐",
      title: "Browser Frames",
    },
    {
      icon: "⚡",
      title: "Instant Preview",
    },
  ];

  return (
    <header
      className="
        mx-auto
        flex
        max-w-3xl
        flex-col
        items-center
        gap-6
        text-center
      "
    >
      {/* Logo */}
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-[28px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          shadow-[0_0_60px_rgba(59,130,246,.18)]
        "
      >
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-blue-500
            text-xl
            font-bold
            text-white
          "
        >
          ▣
        </div>
      </div>

      {/* Title */}
      <div className="space-y-3">
        <h1
          className="
            text-5xl
            font-black
            tracking-tight
            text-white
          "
        >
          RepoShot
        </h1>

        <p
          className="
            mx-auto
            max-w-xl
            text-lg
            leading-8
            text-zinc-400
          "
        >
          Create beautiful browser mockups
          for GitHub projects in seconds.
        </p>
      </div>

      {/* Feature badges */}
      <div
        className="
          flex
          flex-wrap
          justify-center
          gap-4
        "
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-5
              py-2.5
              text-sm
              text-zinc-300
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-blue-500/40
              hover:bg-white/10
              hover:text-white
            "
          >
            <span>{feature.icon}</span>

            <span>{feature.title}</span>
          </div>
        ))}
      </div>
    </header>
  );
}