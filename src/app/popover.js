import { Popover } from 'flowbite';
import type { PopoverOptions, PopoverInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';



const PopOver = (chartData) => {
    const $targetEl: HTMLElement = document.getElementById('popoverContent');

// set the element that trigger the popover using hover or click
const $triggerEl: HTMLElement = document.getElementById('popoverButton');

// options with default values
const options: PopoverOptions = {
    placement: 'top',
    triggerType: 'hover',
    offset: 10,
    onHide: () => {
        console.log('popover is shown');
    },
    onShow: () => {
        console.log('popover is hidden');
    },
    onToggle: () => {
        console.log('popover is toggled');
    },
};

// instance options object
const instanceOptions: InstanceOptions = {
  id: 'popoverContent',
  override: true
};

if ($targetEl) {
    /*
     * targetEl: required
     * triggerEl: required
     * options: optional
     * instanceOptions: optional
     */
    const popover: PopoverInterface = new Popover(
        $targetEl,
        $triggerEl,
        options,
        instanceOptions
    );

    popover.show();
}

  return (
    <div>
    <button data-popover-target="popover-default" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default popover</button>

<div data-popover id="popover-default" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
    <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
        <h3 class="font-semibold text-gray-900 dark:text-white">Popover title</h3>
    </div>
    <div class="px-3 py-2">
        <p>And here's some amazing content. It's very engaging. Right?</p>
    </div>
    <div data-popper-arrow></div>
</div>
</div>
  )
};

export default PopOver;
