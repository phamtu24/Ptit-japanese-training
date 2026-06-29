"use client";

import { useEffect, useState } from "react";
import { programData } from "@/data/programData";

const navItems = [
  ["Tổng quan", "#overview"],
  ["Chương trình", "#program"],
  ["CLO/PLO", "#outcomes"],
  ["Roadmap", "#timeline"],
  ["Đánh giá", "#assessment"],
  ["Mô hình", "#model"],
];

function SectionTitle({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-title">
      <span>{kicker}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function TextLines({ text }: { text: string | number | null | undefined }) {
  if (!text) return <span className="muted">—</span>;
  return (
    <>
      {String(text)
        .split("\n")
        .map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
    </>
  );
}

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setVisibleSections((prev) =>
              prev.includes(id) ? prev : [...prev, id],
            );
          }
        });
      },
      { threshold: 0.18 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const stats = [
    ["Tổng thời lượng", programData.overview.duration],
    ["Tín chỉ", programData.overview.credits],
    ["Học kỳ", programData.overview.semesters],
    ["Giờ / học kỳ", programData.overview.hoursPerSemester],
  ];

  const isVisible = (id: string) =>
    visibleSections.includes(id) || id === "overview";

  return (
    <main>
      <header className="site-header">
        <div className="brand">
          <img src="/logo.png" alt="rikkei logo" className="logo" />
        </div>
        <nav>
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section
        className={`hero section-reveal ${isVisible("overview") ? "is-visible" : ""}`}
        id="overview"
        data-reveal
      >
        <div className="hero-copy">
          <div className="eyebrow">✦ Báo cáo - Tổng quan CTĐT</div>
          <h1>{programData.title}</h1>
          <p className="subtitle">{programData.subtitle}</p>
          <div className="hero-actions">
            <a href="#program" className="btn primary">
              Xem lộ trình
            </a>
            <a href="#timeline" className="btn ghost">
              Roadmap ngắn gọn
            </a>
          </div>
        </div>
        <div className="hero-card">
          <div className="jp-mark">日</div>
          <h3>
            Hiểu ngôn ngữ → Sử dụng ngôn ngữ → Giải quyết công việc bằng ngôn
            ngữ
          </h3>
          <p>{programData.overview.model}</p>
        </div>
      </section>

      <section
        className={`mission-grid section-reveal ${isVisible("mission") ? "is-visible" : ""}`}
        id="mission"
        data-reveal
      >
        <article className="mission-card">
          <div className="icon">🎯</div>
          <div className="mission-content">
            <h2>Mission</h2>
            <p>{programData.mission}</p>
          </div>
        </article>
        <div className="stat-grid">
          {stats.map(([label, value]) => (
            <article className="stat-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`section section-reveal ${isVisible("program") ? "is-visible" : ""}`}
        id="program"
        data-reveal
      >
        <SectionTitle
          kicker="Chương trình đào tạo"
          title="Tổng quan lộ trình 4 học kỳ - 24 tín chỉ"
        >
          Thiết kế theo Outcome-Based Education, tập trung vào năng lực tiếng
          Nhật, kỹ năng làm việc và ngữ cảnh CNTT.
        </SectionTitle>
        <div className="course-roadmap">
          {programData.courses.map((course, i) => (
            <article className="course-card" key={course.code}>
              <span className="semester">Học kỳ {i + 1}</span>
              <h3>{course.name}</h3>
              <p>{course.code}</p>
              <div>
                <strong>{course.credits}</strong> tín chỉ ·{" "}
                <strong>{course.hours}</strong> giờ
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`section section-reveal ${isVisible("outcomes") ? "is-visible" : ""}`}
        id="outcomes"
        data-reveal
      >
        <SectionTitle
          kicker="Chuẩn đầu ra"
          title="Tập trung vào năng lực ứng dụng thực tế"
        >
          Sinh viên biết dùng tiếng Nhật để học tập, làm việc nhóm và giải quyết
          công việc trong môi trường CNTT.
        </SectionTitle>
        <div className="outcomes-grid">
          {programData.plos.slice(0, 3).map((plo) => (
            <article key={plo.id} className="plo-card">
              <strong>{plo.id}</strong>
              <p>{plo.text}</p>
            </article>
          ))}
          <article className="cta-card">
            <h3>Điểm nhấn chính</h3>
            <p>
              Học phần gắn với mục tiêu đầu ra rõ ràng, giúp sinh viên thấy được
              lộ trình học và giá trị sau khi tốt nghiệp.
            </p>
            <a href="#assessment" className="btn primary">
              Xem cách đánh giá
            </a>
          </article>
        </div>
      </section>

      <section
        className={`section section-reveal ${isVisible("timeline") ? "is-visible" : ""}`}
        id="timeline"
        data-reveal
      >
        <SectionTitle
          kicker="Roadmap ngắn gọn"
          title="Mỗi tuần đều có mục tiêu và sản phẩm rõ ràng"
        >
          Trục học tập được thiết kế theo hướng chuẩn bị trước lớp, thực hành
          trong lớp và tạo ra sản phẩm sau mỗi buổi học.
        </SectionTitle>
        <div className="mini-roadmap">
          {programData.schedule.slice(0, 3).map((item) => (
            <article className="mini-step" key={`${item.week}-${item.session}`}>
              <span>{item.week}</span>
              <h3>
                {item.session}: {item.topic}
              </h3>
              <p>
                {String(item.output || "").split("\n")[0] ||
                  "Sản phẩm học tập rõ ràng"}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`section split section-reveal ${isVisible("assessment") ? "is-visible" : ""}`}
        id="assessment"
        data-reveal
      >
        <div>
          <SectionTitle
            kicker="Kiểm tra & đánh giá"
            title="Cấu trúc điểm học phần đơn giản, rõ mục tiêu"
          />
          <div className="assessment-grid">
            {programData.assessment.slice(0, 3).map((row) => (
              <article key={row.component} className="assessment-card">
                <strong>{Math.round(Number(row.weight) * 100)}%</strong>
                <h3>{row.component}</h3>
                <p>{row.requirement}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="condition-card">
          <h3>✅ Điều kiện thi cuối kỳ</h3>
          <p>
            Điểm R-point tối thiểu: <strong>80/120</strong>
          </p>
          {programData.conditions.map((c) => (
            <div key={c.name}>
              <b>{c.name}</b>
              <span>{c.detail}</span>
            </div>
          ))}
        </aside>
      </section>

      <section
        className={`section dark section-reveal ${isVisible("model") ? "is-visible" : ""}`}
        id="model"
        data-reveal
      >
        <SectionTitle
          kicker="Phương pháp học"
          title="Flipped Classroom giúp học tập hiệu quả hơn"
        >
          Sinh viên chuẩn bị trước, làm việc chủ động trong lớp và có sản phẩm
          sau mỗi buổi học.
        </SectionTitle>
        <div className="model-grid">
          {programData.model.slice(0, 3).map((row) => (
            <article key={row.type} className="model-card">
              <h3>{row.type}</h3>
              <p>
                <strong>Trước lớp</strong>
                <TextLines text={row.pre} />
              </p>
              <p>
                <strong>Trong lớp</strong>
                <TextLines text={row.inclass} />
              </p>
              <p>
                <strong>Sau lớp</strong>
                <TextLines text={row.post} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-reveal is-visible" data-reveal>
        <div className="cta-band">
          <div>
            <SectionTitle
              kicker="Kết nối"
              title="Bắt đầu hành trình tiếng Nhật ngay hôm nay"
            >
              Lộ trình học được thiết kế gọn, dễ hiểu và phù hợp cho sinh viên
              CNTT muốn tiến bộ rõ ràng từng học kỳ.
            </SectionTitle>
          </div>
          <a href="#overview" className="btn primary">
            Quay về đầu trang
          </a>
        </div>
      </section>

      <footer>
        <div>🎓 PTIT KS26 - Chương trình ngoại ngữ tiếng Nhật</div>
        <p>
          Giao diện được tối giản để phù hợp với mục đích landing page: giới
          thiệu tổng quan, lộ trình và giá trị học tập một cách trực quan.
        </p>
      </footer>
    </main>
  );
}
