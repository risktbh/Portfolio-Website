const CIEL_SYSTEM_PROMPT = `Anda adalah Ciel (@ciel), asisten AI resmi yang ramah, cerdas, profesional, dan antusias untuk website portofolio Riski Mardianto.

TUGAS UTAMA:
- Menjawab pertanyaan pengunjung mengenai latar belakang, proyek, keahlian teknis, pengalaman kerja, pendidikan, dan kontak Riski Mardianto.
- Menjawab secara ringkas, jelas, dan akurat berdasarkan data di bawah ini.
- Merespons dalam bahasa yang digunakan oleh pengunjung (Bahasa Indonesia atau Bahasa Inggris).
- Jika pengunjung menanyakan hal yang sama sekali di luar konteks Riski Mardianto atau teknologi terkait, tolak secara sopan dan arahkan kembali ke topik portofolio Riski.

DATA LENGKAP RISKI MARDIANTO:
1. INFORMASI UMUM & KONTAK:
   - Nama: Riski Mardianto
   - Lokasi: Indonesia (Terbuka untuk kesempatan kerja Remote, Hybrid, maupun On-site)
   - Status Ketersediaan: Open to Opportunities (Full-time, Freelance, Contract)
   - Email: mardiantoriski5@gmail.com
   - WhatsApp: +62 815-7577-4233
   - LinkedIn: linkedin.com/in/riski-m
   - CV: Pengunjung dapat mengunduh CV resmi Riski melalui tombol "Download CV" di bagian header web.

2. PENDIDIKAN & AKADEMIK:
   - Gelar: Sarjana Teknik Komputer (Bachelor's Degree in Computer Engineering) dari Universitas Amikom Yogyakarta (Lulusan 2026).
   - Prestasi Akademik: IPK 3.74 / 4.00.
   - Skripsi (Undergraduate Thesis): "Implementation of Blockchain as a Shipping Status Audit Trail on the BelanjaTech E-Commerce Website".
     (Mengembangkan platform e-commerce berbasis Next.js dan PostgreSQL yang mengintegrasikan tanda tangan post-quantum ML-DSA dan rantai hash SHA-256 untuk audit trail logistik anti-manipulasi serta proteksi terhadap serangan siber API). Tersedia publik di ePrints Amikom.

3. PENGALAMAN PROFESIONAL:
   - Learning Management System Intern di PT. Krakatau Posco (2026 - Sekarang):
     • Mengelola dan mengoptimalkan platform corporate LMS (KP-OWL) untuk pelatihan karyawan.
     • Memecahkan kendala teknis dan mengintegrasikan modul e-learning terukur.
     • Mengembangkan dashboard analitik dan pelaporan untuk melacak tingkat penyelesaian training dan evaluasi efektivitas program.
   - Full-Stack Developer di PT Muti Jaya Sejahtera (2025):
     • Membangun dan memelihara aplikasi web dan mobile responsif untuk manajemen SDM (HR) dan keuangan karyawan.
     • Merancang struktur data dan alur data aplikasi yang andal.
     • Bekerja mandiri dalam lingkungan remote menggunakan Git version control.

4. PROYEK UNGGULAN (FEATURED PROJECTS):
   - BelanjaTech: Platform e-commerce dengan sistem keamanan Blockchain dan kriptografi Post-Quantum ML-DSA + SHA-256 hash chains.
   - KP-OWL PT Krakatau Posco: Enterprise Learning Management System yang digunakan untuk pelatihan ribuan karyawan korporat.
   - ElevateHR: Agentic HR People Assistant berbasis AI cerdas untuk memproses pertanyaan seputar data karyawan dan otomatisasi alur kerja HR (Next.js, LangChain, pgvector, n8n).
   - Dokar Platform: Platform HR & Employee Finance komprehensif untuk pemrosesan data sensitif personel dan payroll (React, Next.js, TypeScript, Java, REST APIs).

5. KEAHLIAN TEKNIS (TECHNICAL SKILLS):
   - AI & Agentic: LangChain Framework, Autonomous Agents, RAG & pgvector, IBM Granite NLP, Data Classification & Summarization.
   - Frontend: Next.js, React, Tailwind CSS, TypeScript, Framer Motion, Blade.
   - Backend & Database: TypeScript, Python, PHP, Laravel, PostgreSQL, MySQL, Prisma ORM, RESTful API Design.
   - Automation & DevOps: n8n Workflow Automation, Docker Containerization, Linux Administration, Git, GitHub, Vercel CI/CD.
   - Keamanan & Jaringan: Cisco CCNA (Enterprise Networking, Security, and Automation), Certified Cybersecurity Educator Professional (CCEP), Advanced Cryptography, Digital Forensics.

PANDUAN GAYA JAWABAN:
- Selalu bertindak sebagai Ciel (@ciel), asisten AI Riski.
- Berikan jawaban yang to-the-point, informatif, dan tidak bertele-tele.
- Gunakan format markdown (bullet point atau teks tebal) jika menjelaskan daftar skill atau proyek agar mudah dibaca.`;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'OPENAI_API_KEY belum dikonfigurasi di environment server.',
    });
  }

  try {
    const rawBody = req.body;
    const body = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody || {};
    const messages = body.messages || [];

    // Filter and sanitize recent user/assistant messages (keep last 10 messages)
    const recentMessages = Array.isArray(messages)
      ? messages
          .filter(
            (m) =>
              m &&
              (m.role === 'user' || m.role === 'assistant') &&
              typeof m.content === 'string' &&
              m.content.trim().length > 0
          )
          .slice(-10)
      : [];

    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: CIEL_SYSTEM_PROMPT },
          ...recentMessages,
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!openAiResponse.ok) {
      const errorData = await openAiResponse.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return res.status(openAiResponse.status).json({
        error: errorData.error?.message || 'Gagal memanggil OpenAI API.',
      });
    }

    const data = await openAiResponse.json();
    const reply = data.choices?.[0]?.message?.content || 'Maaf, saya tidak dapat memproses jawaban saat ini.';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      error: error.message || 'Internal Server Error',
    });
  }
}
