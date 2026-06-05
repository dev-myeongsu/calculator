interface Calculator {
  currentNumber: string; // 현재 입력 중인 숫자
  previousNumber: string; // 이전에 입력한 숫자
  operation: string | null; // 연산 기호 또는 null
  isNewNumber: boolean; // 새로운 숫자 입력 여부
}
