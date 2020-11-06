export default function MirrorNews({ news }) {
  const news_ = news.slice(0, 5).map((item) => (
    <li className="my-2">
      <small className="text-secondary">
        {new Date(item.isoDate || "").toLocaleDateString()}
      </small>
      <br />
      <a href={item.link}>{item.title}</a>
    </li>
  ));
  return (
    <div>
      <p>
        您可以关注镜像源 Telegram 频道{" "}
        <a href="https://t.me/sjtug_mirrors_news">@sjtug_mirrors_news</a>{" "}
        以获取最新资讯。
      </p>
      <ul className="list-unstyled">{news_}</ul>
    </div>
  );
}
