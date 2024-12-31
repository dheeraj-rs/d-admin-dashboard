'use client';
import { AutoComplete, AutoCompleteCompleteEvent } from '@/components/AutoComplete/AutoComplete';
import { Button } from '@/components/Button/Button';
import { Calendar } from '@/components/Calendar/Calendar';
import Checkbox, { CheckboxChangeEvent } from '@/components/Checkbox/Checkbox';
import { Chips } from '@/components/Chips/Chips';
import ColorPicker, { ColorPickerHSBType, ColorPickerRGBType } from '@/components/ColorPicker/ColorPicker';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import InputNumber from '@/components/InputNumber/InputNumber';
import InputSwitch from '@/components/InputSwitch/InputSwitch';
import { InputText } from '@/components/InputText/InputText';
import InputTextarea from '@/components/InputTextarea/InputTextarea';
import Knob from '@/components/Knob/Knob';
import ListBox from '@/components/ListBox/ListBox';
import { MultiSelect } from '@/components/MultiSelect/MultiSelect';
import RadioButton from '@/components/RadioButton/RadioButton';
import Rating from '@/components/Rating/Rating';
import SelectButton from '@/components/SelectButton/SelectButton';
import Slider from '@/components/Slider/Slider';
import ToggleButton from '@/components/ToggleButton/ToggleButton';
import { CountryService } from '@/demo/service/CountryService';
import type { Demo, Page } from '@/types';
import { useEffect, useState } from 'react';

interface InputValue {
    name: string;
    code: string;
}

const InputDemo: Page = () => {
    const [floatValue, setFloatValue] = useState('');
    const [autoValue, setAutoValue] = useState<Demo.Country[]>([]);
    const [selectedAutoValue, setSelectedAutoValue] = useState(null);
    const [autoFilteredValue, setAutoFilteredValue] = useState<Demo.Country[]>([]);
    const [calendarValue, setCalendarValue] = useState<any>(null);
    const [inputNumberValue, setInputNumberValue] = useState<number | null>(null);
    const [chipsValue, setChipsValue] = useState<any[]>([]);
    const [sliderValue, setSliderValue] = useState<number | string>('');
    const [ratingValue, setRatingValue] = useState<number | null>(null);
    const [colorValue, setColorValue] = useState<string | ColorPickerRGBType | ColorPickerHSBType>('1976D2');
    const [knobValue, setKnobValue] = useState(20);
    const [radioValue, setRadioValue] = useState<string | null>(null);
    const [checkboxValue, setCheckboxValue] = useState<string[]>([]);
    const [switchValue, setSwitchValue] = useState(false);
    const [listboxValue, setListboxValue] = useState<InputValue | null>(null);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [multiselectValue, setMultiselectValue] = useState<InputValue[] | null>(null);
    const [toggleValue, setToggleValue] = useState(false);
    const [selectButtonValue1, setSelectButtonValue1] = useState<InputValue | InputValue[] | null>(null);
    const [selectButtonValue2, setSelectButtonValue2] = useState<InputValue[] | null>(null);
    const [inputGroupValue, setInputGroupValue] = useState(false);
    const [textareaValue, setTextareaValue] = useState('');

    const listboxValues: InputValue[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
    ];

    const dropdownValues: InputValue[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
    ];

    const multiselectValues: InputValue[] = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' },
    ];

    const selectButtonValues1: InputValue[] = [
        { name: 'Option 1', code: 'O1' },
        { name: 'Option 2', code: 'O2' },
        { name: 'Option 3', code: 'O3' },
    ];

    const selectButtonValues2: InputValue[] = [
        { name: 'Option 1', code: 'O1' },
        { name: 'Option 2', code: 'O2' },
        { name: 'Option 3', code: 'O3' },
    ];

    useEffect(() => {
        CountryService.getCountries().then((data) => setAutoValue(data));
    }, []);

    const searchCountry = (event: AutoCompleteCompleteEvent) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredValue([...autoValue]);
            } else {
                setAutoFilteredValue(
                    autoValue.filter((country) => {
                        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                    })
                );
            }
        }, 250);
    };

    const onCheckboxChange = (e: CheckboxChangeEvent) => {
        let selectedValue = [...checkboxValue];
        if (e.target.checked) selectedValue.push(e.target.value);
        else selectedValue.splice(selectedValue.indexOf(e.target.value), 1);

        setCheckboxValue(selectedValue);
    };

    const itemTemplate = (option: InputValue) => {
        return (
            <div className="flex align-items-center">
                <img
                    alt={option.name}
                    src={`/demo/images/flag/flag_placeholder.png`}
                    onError={(e) => (e.currentTarget.src = 'https://png.pngtree.com/png-vector/20211025/ourmid/pngtree-letter-d-logo-png-image_3989483.png')}
                    className={`flag flag-${option.code.toLowerCase()}`}
                    style={{ width: '21px' }}
                />
                <span className="ml-2">{option.name}</span>
            </div>
        );
    };

    return (
        <div className="grid p-fluid input-demo">
            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>InputText</h5>
                    <div className="grid formgrid">
                        <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                            <InputText type="text" placeholder="Default"></InputText>
                        </div>
                        <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                            <InputText type="text" placeholder="Disabled" disabled></InputText>
                        </div>
                        <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                            <InputText type="text" placeholder="Invalid" className="p-invalid" />
                        </div>
                    </div>

                    <h5>Icons</h5>
                    <div className="grid formgrid">
                        <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                            <span className="p-input-icon-left">
                                <i className="pi pi-user" />
                                <InputText type="text" placeholder="Username" />
                            </span>
                        </div>
                        <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                            <span className="p-input-icon-right">
                                <InputText type="text" placeholder="Search" />
                                <i className="pi pi-search" />
                            </span>
                        </div>
                        <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                            <span className="p-input-icon-left p-input-icon-right">
                                <i className="pi pi-user" />
                                <InputText type="text" placeholder="Search" />
                                <i className="pi pi-search" />
                            </span>
                        </div>
                    </div>

                    <h5>Float Label</h5>
                    <span className="p-float-label">
                        <InputText id="username" type="text" value={floatValue} onChange={(e) => setFloatValue(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </span>

                    <h5>Textarea</h5>
                    <InputTextarea value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)} placeholder="Your Message" rows={5} cols={30} />

                    <h5>AutoComplete</h5>
                    <AutoComplete
                        placeholder="Search"
                        id="dd"
                        dropdown
                        multiple
                        value={selectedAutoValue}
                        onChange={(e) => setSelectedAutoValue(e.value)}
                        suggestions={autoFilteredValue}
                        completeMethod={searchCountry}
                        field="name"
                    />

                    <h5>Calendar</h5>
                    <Calendar showIcon showButtonBar value={calendarValue} onChange={(e) => setCalendarValue(e.value ?? null)} />

                    <h5>InputNumber</h5>
                    <InputNumber value={inputNumberValue} onValueChange={(value) => setInputNumberValue(value)} showButtons mode="decimal"></InputNumber>

                    <h5>Chips</h5>
                    <Chips value={chipsValue} onChange={(e) => setChipsValue(e.value ?? [])} />
                </div>

                <div className="card">
                    <div className="grid">
                        <div className="col-12">
                            <h5>Slider</h5>
                            <InputText value={sliderValue as string} onChange={(e) => setSliderValue(parseInt(e.target.value, 10))} />
                            <Slider value={sliderValue as number} onChange={(e) => setSliderValue(e.value as number)} />
                        </div>
                        <div className="col-12 md:col-6">
                            <h5>Rating</h5>
                            <Rating value={ratingValue as number} onChange={(e) => setRatingValue(e)} />
                        </div>
                        <div className="col-12 md:col-6">
                            <h5>ColorPicker</h5>
                            <ColorPicker value={colorValue} onChange={(e) => setColorValue(e.value ?? '')} style={{ width: '2rem' }} />
                        </div>
                        <div className="col-12">
                            <h5>Knob</h5>
                            <Knob value={knobValue} valueTemplate={'{value}%'} onChange={(e) => setKnobValue(e.value)} step={10} min={-50} max={50} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>RadioButton</h5>
                    <div className="grid">
                        <div className="col-12 md:col-4">
                            <div className="field-radiobutton">
                                <RadioButton
                                    inputId="option1"
                                    name="option"
                                    value="Chicago"
                                    checked={radioValue === 'Chicago'}
                                    onChange={(e) => setRadioValue(e.value)}
                                />
                                <label htmlFor="option1">Chicago</label>
                            </div>
                        </div>
                        <div className="col-12 md:col-4">
                            <div className="field-radiobutton">
                                <RadioButton
                                    inputId="option2"
                                    name="option"
                                    value="Los Angeles"
                                    checked={radioValue === 'Los Angeles'}
                                    onChange={(e) => setRadioValue(e.value)}
                                />
                                <label htmlFor="option2">Los Angeles</label>
                            </div>
                        </div>
                        <div className="col-12 md:col-4">
                            <div className="field-radiobutton">
                                <RadioButton
                                    inputId="option3"
                                    name="option"
                                    value="New York"
                                    checked={radioValue === 'New York'}
                                    onChange={(e) => setRadioValue(e.value)}
                                />
                                <label htmlFor="option3">New York</label>
                            </div>
                        </div>
                    </div>

                    <h5>Checkbox</h5>
                    <div className="grid">
                        <div className="col-12 md:col-4">
                            <div className="field-checkbox">
                                <Checkbox
                                    inputId="checkOption1"
                                    name="option"
                                    value="Chicago"
                                    checked={checkboxValue.indexOf('Chicago') !== -1}
                                    onChange={onCheckboxChange}
                                />
                                <label htmlFor="checkOption1">Chicago</label>
                            </div>
                        </div>
                        <div className="col-12 md:col-4">
                            <div className="field-checkbox">
                                <Checkbox
                                    inputId="checkOption2"
                                    name="option"
                                    value="Los Angeles"
                                    checked={checkboxValue.indexOf('Los Angeles') !== -1}
                                    onChange={onCheckboxChange}
                                />
                                <label htmlFor="checkOption2">Los Angeles</label>
                            </div>
                        </div>
                        <div className="col-12 md:col-4">
                            <div className="field-checkbox">
                                <Checkbox
                                    inputId="checkOption3"
                                    name="option"
                                    value="New York"
                                    checked={checkboxValue.indexOf('New York') !== -1}
                                    onChange={onCheckboxChange}
                                />
                                <label htmlFor="checkOption3">New York</label>
                            </div>
                        </div>
                    </div>

                    <h5>Input Switch</h5>
                    <InputSwitch checked={switchValue} onChange={(e) => setSwitchValue(e.value ?? false)} />
                </div>

                <div className="card">
                    <h5>Listbox</h5>
                    <ListBox value={listboxValue} onChange={(e) => setListboxValue(e.value as InputValue)} options={listboxValues} optionLabel="name" filter />

                    <h5>Dropdown</h5>
                    <Dropdown
                        value={dropdownValue}
                        onChange={(e) => setDropdownValue(e.value)}
                        options={dropdownValues}
                        optionLabel="name"
                        placeholder="Select"
                    />

                    <h5>MultiSelect</h5>
                    <MultiSelect
                        value={multiselectValue}
                        onChange={(e) => setMultiselectValue(e.value)}
                        options={multiselectValues}
                        itemTemplate={itemTemplate}
                        optionLabel="name"
                        placeholder="Select Countries"
                        filter
                        className="multiselect-custom"
                        display="chip"
                    />
                </div>

                <div className="card">
                    <h5>ToggleButton</h5>
                    <ToggleButton checked={toggleValue} onChange={(e) => setToggleValue(e.value)} onLabel="Yes" offLabel="No" />

                    <h5>SelectButton</h5>
                    <SelectButton
                        value={selectButtonValue1}
                        onChange={(e) => setSelectButtonValue1(e.value)}
                        options={selectButtonValues1}
                        optionLabel="name"
                    />

                    <h5>SelectButton - Multiple</h5>
                    <SelectButton
                        value={selectButtonValue2}
                        onChange={(e) => setSelectButtonValue2(e.value as InputValue[])}
                        options={selectButtonValues2}
                        optionLabel="name"
                        multiple
                    />
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Input Groups</h5>
                    <div className="grid p-fluid">
                        <div className="col-12 md:col-6">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText placeholder="Username" />
                            </div>
                        </div>

                        <div className="col-12 md:col-6">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-shopping-cart"></i>
                                </span>
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-globe"></i>
                                </span>
                                <InputText placeholder="Price" />
                                <span className="p-inputgroup-addon">$</span>
                                <span className="p-inputgroup-addon">.00</span>
                            </div>
                        </div>

                        <div className="col-12 md:col-6">
                            <div className="p-inputgroup">
                                <Button label="Search" />
                                <InputText placeholder="Keyword" />
                            </div>
                        </div>

                        <div className="col-12 md:col-6">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon p-inputgroup-addon-checkbox">
                                    <Checkbox checked={inputGroupValue} onChange={(e: any) => setInputGroupValue(e.target.checked)} />
                                </span>
                                <InputText placeholder="Confirm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputDemo;
