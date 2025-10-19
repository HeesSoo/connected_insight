import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://ec2-13-209-23-135.ap-northeast-2.compute.amazonaws.com";

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/");
  const url = `${BACKEND_URL}/api/${path}`;

  try {
    // 원본 요청의 헤더 복사
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      // Host 헤더는 제외
      if (key.toLowerCase() !== "host") {
        headers.set(key, value);
      }
    });

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch from backend" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/");
  const url = `${BACKEND_URL}/api/${path}`;

  try {
    const contentType = request.headers.get("content-type") || "";

    let body: FormData | string;
    let headers: HeadersInit = {};

    // Content-Type에 따라 body 처리
    if (contentType.includes("multipart/form-data")) {
      // FormData 처리
      body = await request.formData();
      // multipart/form-data의 경우 헤더를 전달하지 않음 (fetch가 자동으로 설정)
      // Content-Type과 Content-Length를 자동으로 설정하도록 함
    } else if (contentType.includes("application/json")) {
      // JSON 데이터 처리
      const jsonBody = await request.json();
      body = JSON.stringify(jsonBody);
      headers = {
        "Content-Type": "application/json",
      };
    } else {
      // 기타 데이터는 그대로 전달
      body = await request.text();
      // 원본 헤더 복사
      const headersObj: Record<string, string> = {};
      request.headers.forEach((value, key) => {
        if (key.toLowerCase() !== "host" && key.toLowerCase() !== "content-length") {
          headersObj[key] = value;
        }
      });
      headers = headersObj;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch from backend" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/");
  const url = `${BACKEND_URL}/api/${path}`;

  try {
    const contentType = request.headers.get("content-type") || "";

    let body: FormData | string;
    let headers: HeadersInit = {};

    if (contentType.includes("multipart/form-data")) {
      body = await request.formData();
      // multipart/form-data의 경우 헤더를 전달하지 않음 (fetch가 자동으로 설정)
    } else if (contentType.includes("application/json")) {
      const jsonBody = await request.json();
      body = JSON.stringify(jsonBody);
      headers = {
        "Content-Type": "application/json",
      };
    } else {
      body = await request.text();
      const headersObj: Record<string, string> = {};
      request.headers.forEach((value, key) => {
        if (key.toLowerCase() !== "host" && key.toLowerCase() !== "content-length") {
          headersObj[key] = value;
        }
      });
      headers = headersObj;
    }

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch from backend" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/");
  const url = `${BACKEND_URL}/api/${path}`;

  try {
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "host") {
        headers.set(key, value);
      }
    });

    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch from backend" }, { status: 500 });
  }
}
