/**
 * 사용자 코드 실행 및 결과 추출 (더미 구현)
 * 실제 백엔드 API 호출 없이 프론트엔드에서 코드 분석
 */

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
}

/**
 * Python 코드 실행 (더미)
 */
export function executePython(code: string): ExecutionResult {
  try {
    // print() 문에서 값 추출
    const printMatch = code.match(/print\((.*?)\)/);
    if (printMatch) {
      let result = printMatch[1].trim();
      // 따옴표 제거
      result = result.replace(/^["']|["']$/g, "");
      // f-string 처리
      result = result.replace(/f["'](.*?)["']/g, "$1");
      return { success: true, output: result };
    }

    // return 문에서 값 추출
    const returnMatch = code.match(/return\s+(.*?)(?:\n|$)/);
    if (returnMatch) {
      let result = returnMatch[1].trim();
      result = result.replace(/^["']|["']$/g, "");
      return { success: true, output: result };
    }

    return { success: true, output: "(출력 없음)" };
  } catch (error: any) {
    return { success: false, output: "", error: error.message };
  }
}

/**
 * JavaScript 코드 실행 (더미)
 */
export function executeJavaScript(code: string): ExecutionResult {
  try {
    // console.log() 에서 값 추출
    const logMatch = code.match(/console\.log\((.*?)\)/);
    if (logMatch) {
      let result = logMatch[1].trim();
      result = result.replace(/^["']|["']$/g, "");
      result = result.replace(/`(.*?)`/g, "$1");
      return { success: true, output: result };
    }

    // return 문에서 값 추출
    const returnMatch = code.match(/return\s+(.*?)(?:;|\n|$)/);
    if (returnMatch) {
      let result = returnMatch[1].trim();
      result = result.replace(/^["']|["']$/g, "");
      return { success: true, output: result };
    }

    return { success: true, output: "(출력 없음)" };
  } catch (error: any) {
    return { success: false, output: "", error: error.message };
  }
}

/**
 * Java 코드 실행 (더미)
 */
export function executeJava(code: string): ExecutionResult {
  try {
    // System.out.println() 에서 값 추출
    const printMatch = code.match(/System\.out\.println\((.*?)\)/);
    if (printMatch) {
      let result = printMatch[1].trim();
      result = result.replace(/^["']|["']$/g, "");
      return { success: true, output: result };
    }

    return { success: true, output: "(출력 없음)" };
  } catch (error: any) {
    return { success: false, output: "", error: error.message };
  }
}

/**
 * C++ 코드 실행 (더미)
 */
export function executeCpp(code: string): ExecutionResult {
  try {
    // cout 에서 값 추출
    const coutMatch = code.match(/cout\s*<<\s*(.*?)(?:;|<<)/);
    if (coutMatch) {
      let result = coutMatch[1].trim();
      result = result.replace(/^["']|["']$/g, "");
      result = result.replace(/\s*<<\s*endl.*$/g, "");
      return { success: true, output: result };
    }

    return { success: true, output: "(출력 없음)" };
  } catch (error: any) {
    return { success: false, output: "", error: error.message };
  }
}

/**
 * C 코드 실행 (더미)
 */
export function executeC(code: string): ExecutionResult {
  try {
    // printf 에서 값 추출
    const printfMatch = code.match(/printf\((.*?)\)/);
    if (printfMatch) {
      let result = printfMatch[1].trim();
      result = result.replace(/^["']|["']$/g, "");
      // %d, %s 등 포맷 제거
      result = result.match(/["'](.*?)["']/)?.[1] || result;
      return { success: true, output: result };
    }

    return { success: true, output: "(출력 없음)" };
  } catch (error: any) {
    return { success: false, output: "", error: error.message };
  }
}

/**
 * 언어별 코드 실행
 */
export function executeCode(code: string, language: string): ExecutionResult {
  switch (language) {
    case "python":
      return executePython(code);
    case "javascript":
      return executeJavaScript(code);
    case "java":
      return executeJava(code);
    case "cpp":
      return executeCpp(code);
    case "c":
      return executeC(code);
    default:
      return { success: false, output: "", error: "지원하지 않는 언어입니다" };
  }
}
