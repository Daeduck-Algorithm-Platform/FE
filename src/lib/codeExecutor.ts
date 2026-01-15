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
export function executePython(code: string, input?: any): ExecutionResult {
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
 * JavaScript 코드 실행 (실제 eval 사용)
 */
export function executeJavaScript(code: string, input?: any): ExecutionResult {
  try {
    // console.log를 캡처하기 위한 배열
    const outputs: string[] = [];

    // console.log를 오버라이드
    const mockConsole = {
      log: (...args: any[]) => {
        outputs.push(args.map((arg) => String(arg)).join(" "));
      },
    };

    try {
      // 입력값이 문자열이면 파싱, 없으면 기본값 사용
      let parsedInput = input;
      if (typeof input === "string") {
        try {
          parsedInput = JSON.parse(input);
        } catch {
          // JSON 파싱 실패시 문자열 그대로 사용
          parsedInput = input;
        }
      } else if (!input) {
        // 입력값이 없으면 기본값
        parsedInput = [3, 1, 4, 1, 5, 9, 2, 6];
      }

      // 코드를 실행하고 solve 함수를 찾아 호출
      const wrappedCode = `
        ${code}
        // solve 함수가 정의되었는지 확인하고 호출
        if (typeof solve === 'function') {
          try {
            // 전달받은 입력값으로 solve 함수 호출
            const result = solve(INPUT_PARAM);
            if (result !== undefined) {
              return result;
            }
          } catch (e) {
            // solve 함수 호출 실패
          }
        }
        return undefined;
      `.replace("INPUT_PARAM", JSON.stringify(parsedInput));

      const result = new Function("console", wrappedCode)(mockConsole);

      // console.log가 있으면 그 출력값 반환
      if (outputs.length > 0) {
        return { success: true, output: outputs.join("\n") };
      }

      // console.log가 없으면 return 값 확인
      if (result !== undefined && result !== null) {
        return { success: true, output: String(result) };
      }

      return { success: true, output: "(출력 없음)" };
    } catch (evalError: any) {
      return { success: false, output: "", error: evalError.message };
    }
  } catch (error: any) {
    return { success: false, output: "", error: error.message };
  }
}

/**
 * Java 코드 실행 (더미)
 */
export function executeJava(code: string, input?: any): ExecutionResult {
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
export function executeCpp(code: string, input?: any): ExecutionResult {
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
export function executeC(code: string, input?: any): ExecutionResult {
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
export function executeCode(
  code: string,
  language: string,
  input?: any
): ExecutionResult {
  switch (language) {
    case "python":
      return executePython(code, input);
    case "javascript":
      return executeJavaScript(code, input);
    case "java":
      return executeJava(code, input);
    case "cpp":
      return executeCpp(code, input);
    case "c":
      return executeC(code, input);
    default:
      return { success: false, output: "", error: "지원하지 않는 언어입니다" };
  }
}
