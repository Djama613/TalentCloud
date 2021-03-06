<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;
use App\Models\Lookup\Frequency;
use Prophecy\Prediction\CallTimesPrediction;

/**
 * Class WorkEnvironment
 *
 * @property int $id
 * @property int $manager_id
 * @property boolean $remote_work_allowed
 * @property int $telework_allowed_frequency_id
 * @property int $flexible_hours_frequency_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Manager $manager
 * @property \App\Models\Lookup\Frequency $telework_allowed_frequency
 * @property \App\Models\Lookup\Frequency $flexible_hours_frequency
 * @property \Illuminate\Database\Eloquent\Collection $workplace_photo_captions
 * @property \Illuminate\Database\Eloquent\Collection $work_environment_translations
 *
 * Localized Properties:
 * @property string $things_to_know
 */
class WorkEnvironment extends BaseModel {

    use \Dimsav\Translatable\Translatable;
    
    public $translatedAttributes = ['things_to_know'];
    protected $casts = [
        'remote_work_allowed' => 'boolean'
    ];
    protected $fillable = [
        'remote_work_allowed',
        'telework_allowed_frequency_id',
        'flexible_hours_frequency_id'
    ];
    protected $with = [
        'telework_allowed_frequency',
        'flexible_hours_frequency'
    ];

    public function manager() {
        return $this->belongsTo(\App\Models\Manager::class);
    }

    public function telework_allowed_frequency() {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    public function flexible_hours_frequency() {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    public function workplace_photo_captions() {
        return $this->hasMany(\App\Models\WorkplacePhotoCaption::class);
    }

    public function work_environment_translations() {
        return $this->hasMany(\App\Models\WorkEnvironmentTranslation::class);
    }

}
