import { ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import Button from "./button";
import Input from "./input";

export interface NumberInputProps
  extends Omit<NumericFormatProps, "value" | "onValueChange"> {
  stepper?: number;
  thousandSeparator?: string;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  value?: number;
  suffix?: string;
  prefix?: string;
  onValueChange?: (value: number | undefined) => void;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      stepper = 1,
      thousandSeparator,
      placeholder,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      onValueChange,
      fixedDecimalScale = false,
      decimalScale = 0,
      suffix,
      prefix,
      value: controlledValue,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const combinedRef = ref || internalRef;
    const [value, setValue] = useState<number | undefined>(
      controlledValue ?? defaultValue
    );

    const handleIncrement = useCallback(
      (shiftPressed: boolean) => {
        const incrementStep = shiftPressed ? 5 : stepper;
        setValue((prev) =>
          prev === undefined
            ? incrementStep
            : Math.min(prev + incrementStep, max)
        );
      },
      [stepper, max]
    );

    const handleDecrement = useCallback(
      (shiftPressed: boolean) => {
        const decrementStep = shiftPressed ? 5 : stepper;
        setValue((prev) =>
          prev === undefined
            ? -decrementStep
            : Math.max(prev - decrementStep, min)
        );
      },
      [stepper, min]
    );

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          document.activeElement ===
          (combinedRef as React.RefObject<HTMLInputElement>).current
        ) {
          const shiftPressed = e.shiftKey;
          if (e.key === "ArrowUp") {
            handleIncrement(shiftPressed);
          } else if (e.key === "ArrowDown") {
            handleDecrement(shiftPressed);
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [handleIncrement, handleDecrement, combinedRef]);

    useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    const handleChange = (values: {
      value: string;
      floatValue: number | undefined;
    }) => {
      const newValue =
        values.floatValue === undefined ? undefined : values.floatValue;
      setValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    const handleBlur = () => {
      if (value !== undefined) {
        if (value < min) {
          setValue(min);
          (ref as React.RefObject<HTMLInputElement>).current!.value =
            String(min);
        } else if (value > max) {
          setValue(max);
          (ref as React.RefObject<HTMLInputElement>).current!.value =
            String(max);
        }
      }
    };

    const handleButtonClick = (increment: boolean) => (e: React.MouseEvent) => {
      const shiftPressed = e.shiftKey;
      if (increment) {
        handleIncrement(shiftPressed);
      } else {
        handleDecrement(shiftPressed);
      }
    };

    return (
      <div className="flex items-center ">
        <NumericFormat
          value={value}
          onValueChange={handleChange}
          thousandSeparator={thousandSeparator}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowNegative={min < 0}
          valueIsNumericString
          onBlur={handleBlur}
          max={max}
          min={min}
          suffix={suffix}
          prefix={prefix}
          customInput={Input}
          placeholder={placeholder}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-r-none relative"
          getInputRef={combinedRef}
          {...props}
        />
        <div className="flex flex-col">
          <Button
            aria-label="Increase value"
            className="px-2 h-5 rounded-l-none bg-primary-foreground/10 rounded-br-none border-input border-l-0 border-b-[0.5px] focus-visible:relative"
            variant="outline"
            onClick={handleButtonClick(true)}
            disabled={value === max}
          >
            <ChevronUp size={15} />
          </Button>
          <Button
            aria-label="Decrease value"
            className="px-2 h-5 rounded-l-none bg-primary-foreground/10 rounded-tr-none border-input border-l-0 border-t-[0.5px] focus-visible:relative"
            variant="outline"
            onClick={handleButtonClick(false)}
            disabled={value === min}
          >
            <ChevronDown size={15} />
          </Button>
        </div>
      </div>
    );
  }
);
