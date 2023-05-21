// 프로토타입 레지스트리
// 정적 메서드를 사용하기 위해 추상 클래스로 구현
// 다중 상속이 필요한 경우, 믹스인을 사용하면 됨.
abstract class Prototype {
  private static registry: { [name: string]: Prototype } = {};

  static addRegistry(name: string, prototype: Prototype) {
    Prototype.registry[name] = prototype;
  }

  static getPrototypeFromRegistry(name: string) {
    if (this.registry[name]) {
      return this.registry[name].clone();
    } else {
      throw new Error("해당 프로토타입이 존재하지 않습니다.");
    }
  }

  abstract clone(): Prototype;
}

interface RobotConfig {
  color: string;
  sight: number;
  height: number;
  hobby: string;
}

class Robot extends Prototype {
  private complexConfig: RobotConfig;

  constructor(config: RobotConfig) {
    super();
    this.complexConfig = config;
  }

  clone() {
    return new Robot({
      ...this.complexConfig,
    });
  }
}

// client code
const robotA = new Robot({
  color: "red",
  sight: 0.3,
  height: 180,
  hobby: "knitting",
});

Prototype.addRegistry("robotA", robotA);

const massProduce = (protoType: Prototype) => {
  for (let i = 0; i < 100; i++) {
    protoType.clone();
  }
};

massProduce(Prototype.getPrototypeFromRegistry("robotA"));
