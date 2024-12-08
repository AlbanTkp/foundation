<?php

namespace App\Console\Commands;

use App\Jobs\ExportDataJob;
use Illuminate\Console\Command;

class ExportDataCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:export-data-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export data to a specific URL';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        ExportDataJob::dispatch();
        
        $this->info('Data export job dispatched successfully.');
    }
}
